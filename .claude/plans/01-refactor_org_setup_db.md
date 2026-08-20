# Migrate Organization DB Layer to Prisma ORM

## Context

The organization-setup feature (`Organization`, contacts, addresses, bank details) was originally designed as a single flat `organizations` table plus a separate `organization_bank_details` table, both hand-written as raw SQL against Node's built-in `node:sqlite` (`DatabaseSync`). That design couldn't represent more than one owner/contact, one address, or one bank account per organization.

`.claude/specs/refactor_org_setup_db.md` already specifies the fix: normalize into six models (`Organization`, `OrganizationContact`, `OrganizationContactNumber`, `OrganizationContactEmail`, `OrganizationAddress`, `OrganizationBankDetail`) and manage them through **Prisma ORM** instead of hand-written SQL, using Prisma's default naming (no `@map`/`@@map`).

Investigating the current codebase surfaced that the raw-SQL implementation was never actually working:
- `electron/db/schema.sql` — which `electron/db/index.js`'s `initDb()` executes verbatim via `db.exec(schema)` on every startup — currently contains the markdown spec document (duplicated twice) instead of SQL DDL. Running it would throw.
- A stray, already-empty `inventory.db` exists at the real Electron userData path (`%APPDATA%\inventory\inventory.db`) from an older, no-longer-committed version of `schema.sql`, containing empty `organizations`/`organization_bank_details` tables that need cleaning up.
- `electron/main.js`, `electron/preload.js`, and `src/services/organizationApi.js` use three different, mismatched IPC channel/method names, and `electron/controllers/index.js` is an empty dead file — so the "create organization" flow cannot run end-to-end today regardless of the DB layer.
- The Setup Organisation form only collects one owner (one mobile number, one email), one optional address, and one bank account — there is no repeater/array UI anywhere yet.

**Scope decisions already made with the user:**
1. **Frontend stays exactly as-is.** The backend accepts today's flat single-value payload and internally creates exactly one `OrganizationContact` (with one nested `OrganizationContactNumber`, and one `OrganizationContactEmail` if an email was given) and one `OrganizationAddress` per organization. Building multi-entry UI is separate future work.
2. **The IPC wiring bugs are NOT fixed here.** `main.js`, `preload.js`, `organizationApi.js`, and `controllers/index.js` are left untouched. This means the running Electron app's UI cannot be used to verify this change — verification happens by driving the controller/services directly from a script.
3. **`Organization.inventoryStartDate` is a `DateTime` with no `@default`** (confirmed with user) — it's a required, user-supplied value from the form, not a creation timestamp, so a default is inappropriate even though the schema doc currently has a leftover `@default(now())` and an inconsistent `String` type in its Section 9 summary table. Both will be corrected as step 1 below.

The outcome of this plan: `prisma/schema.prisma` becomes the single source of truth for the organization schema, Prisma Migrate manages schema changes, and every raw SQL statement in the organization/bank-details services is replaced by Prisma Client calls — with the orphan-write bug (organization created but bank-details insert fails, leaving a dangling row) fixed by wrapping both writes in one transaction.

---

## Implementation Steps

### 1. Fix the spec inconsistency
In `.claude/specs/refactor_org_setup_db.md`:
- Section 3 code block: remove `@default(now())` from `inventoryStartDate` (keep `DateTime`).
- Section 9 table: change the `inventoryStartDate` row's type from `String` to `DateTime`.

### 2. Install Prisma and scaffold
```bash
npm install --save-dev prisma
npm install @prisma/client
npx prisma init --datasource-provider sqlite
```
- Edit the generated `.env`: `DATABASE_URL="file:./prisma/dev.db"` (this is only for local `prisma migrate dev`/`studio` authoring — see step 4 for the real runtime path).
- Add `prisma/dev.db` and `prisma/dev.db-journal` to `.gitignore` (in addition to whatever `prisma init` already added).
- Add `package.json` scripts: `prisma:generate` (`prisma generate`), `prisma:migrate` (`prisma migrate dev`), `prisma:deploy` (`prisma migrate deploy`), `prisma:studio` (`prisma studio`), and `postinstall` (`prisma generate`) so the client regenerates automatically after every `npm install`.

### 3. Write `prisma/schema.prisma`
Six models exactly as specified in `.claude/specs/refactor_org_setup_db.md` sections 3–6 (post step-1 fix), datasource `provider = "sqlite"`, generator `provider = "prisma-client-js"`. No `@map`/`@@map` anywhere — table names equal the PascalCase model names, columns equal the camelCase field names.

### 4. Resolve the Electron dynamic-userData-path problem
Electron's DB file lives at `app.getPath('userData')/inventory.db`, known only at runtime — but Prisma's CLI needs a resolvable `DATABASE_URL` to run migrations, and `PrismaClient` needs one to connect.

Create **`electron/db/prismaClient.js`**, replacing `electron/db/connection.js`:
- Resolve the real path at runtime: `const databaseUrl = "file:" + path.join(app.getPath("userData"), "inventory.db").replace(/\\/g, "/")`.
- `initDb()`: run `prisma migrate deploy` as a blocking child process (`execFileSync`) with `DATABASE_URL` overridden to `databaseUrl` in `env`. This is idempotent (Prisma tracks applied migrations), matches today's synchronous, un-awaited `initDb()` call in `main.js`, and needs no change to `main.js` itself.
- `getPrismaClient()`: lazy module-level singleton — `new PrismaClient({ datasourceUrl: databaseUrl })` (or the `datasources: { db: { url } }` constructor form if the installed Prisma version predates the `datasourceUrl` shorthand — verify once installed).
- **Local dev migration authoring** stays separate from this: `npx prisma migrate dev` continues to run against the static `.env` `DATABASE_URL` (`./prisma/dev.db`) to create/review migrations before they're committed; the runtime path in `initDb()` only ever *applies* already-committed migrations.
- Packaging (asar-unpacking `prisma/migrations`, the CLI, and the query-engine binary for a future `electron-builder` pass) is explicitly out of scope for this change — flag it as follow-up work when packaging is tackled.

Rewrite `electron/db/index.js` (path stays the same — `main.js` imports `initDb` from `./db/index.js` and must not be touched) as a thin barrel re-exporting from the new file:
```js
export { initDb, getPrismaClient } from "./prismaClient.js"
```
Delete `electron/db/connection.js` and `electron/db/schema.sql` — both fully superseded.

### 5. First migration
```bash
npx prisma migrate dev --create-only --name init
```
Hand-edit the generated `migration.sql` to add, before the `CREATE TABLE` statements, cleanup for the stray legacy tables found on-disk:
```sql
DROP TABLE IF EXISTS "organizations";
DROP TABLE IF EXISTS "organization_bank_details";
```
Then `npx prisma migrate dev` to apply it against the dev database. No other hand-written data-backfill SQL is needed — both legacy tables are empty, so there's no real data to preserve (Section 14 of the spec's data-preservation steps don't apply here).

### 6. Rewrite the service layer
`electron/services/organizationService.js` — replace the raw `INSERT`/`SELECT` with Prisma calls. `create(payload, client)` calls `client.organization.create({ data, include: {...} })` where `data` is the nested-create shape from the transformer (step 7) — Prisma wraps nested relation writes (contact → numbers/emails, addresses) in an implicit transaction automatically, no extra `$transaction` needed at this level. `findById(id, client)` becomes `client.organization.findUnique({ where: { id }, include: { contacts: { include: { numbers: true, emails: true } }, addresses: true } })`. Both methods accept an optional `client` param (defaulting to the instance's `PrismaClient`) so the controller can pass in a transaction client — see step 8.

`electron/services/bankDetailsService.js` — same pattern: `create(organizationId, payload, client)` → `client.organizationBankDetail.create({ data: { organizationId, ...transformed } })`; `findByOrganizationId(organizationId, client)` → `client.organizationBankDetail.findFirst({ where: { organizationId } })` (kept singular via `findFirst` rather than `findMany`, since only one bank account is ever created today — matches the existing controller/serialiser response shape; revisit when multi-account UI exists).

Both services' private `#insert` SQL helpers are deleted entirely.

### 7. Rewrite the transformers
`electron/transformers/organizationTransformer.js` — `convertToIsoDate` is deleted (no longer needed: `inventoryStartDate` is a Prisma `DateTime` now, and the validator's `z.coerce.date()` already produces a `Date`, so it passes straight through). Output changes from a flat snake_case row to the nested Prisma `data` argument:
```js
{
  name, industry, logoPath: formData.logoPath ?? null,
  currency, timezone, inventoryStartDate: formData.inventoryStartDate,
  fiscalYear, pan: formData.pan ?? null, gst: formData.gst ?? null,
  contacts: {
    create: [{
      name: formData.ownerName,
      position: "Owner",           // hardcoded — form doesn't collect this yet
      isPrimary: true,
      numbers: { create: [{ countryCode: formData.countryCode, mobileNumber: formData.mobileNumber, isPrimary: true }] },
      emails: formData.email ? { create: [{ email: formData.email, isPrimary: true }] } : undefined,
    }],
  },
  addresses: {
    create: [{
      name: "Head Office",          // hardcoded — form doesn't collect this yet
      addressType: "head_office",   // hardcoded — form doesn't collect this yet
      country: formData.country, state: formData.state,
      city: formData.city ?? null, street1: formData.street1 ?? null,
      street2: formData.street2 ?? null, postalCode: formData.postalCode ?? null,
      isPrimary: true,
    }],
  },
}
```
The two hardcoded defaults (`position`, address `name`/`addressType`) are a direct, deliberate consequence of scope decision #1 — flag them clearly in code comments as gaps to close when multi-contact/address UI is built.

`electron/transformers/bankDetailsTransformer.js` — same camelCase field mapping as today, plus `isPrimary: true` (it's the org's only/first bank account).

### 8. Controller: fix the orphan-write bug
`electron/controllers/organizationController.js` keeps its exact external contract (`show({data})` / `store({data})` in, `{organization, bankDetails}` out) — no changes needed to `main.js`/`preload.js`/`organizationApi.js`. Inside `store()`, wrap both writes in one interactive `$transaction` so a bank-details failure can't leave an orphaned organization:
```js
return this.prisma.$transaction(async (tx) => {
  const organization = await this.organizationService.create(organizationPayload, tx)
  const bankDetails = await this.bankDetailsService.create(organization.data.id, bankDetailsPayload, tx)
  return { organization, bankDetails }
})
```
`show()` just awaits the now-async `organizationService.findById` / `bankDetailsService.findByOrganizationId`. Constructor gains a `prisma = getPrismaClient()` param.

### 9. Validators and serialisers — unchanged
`organizationValidator.js` and `bankDetailsValidator.js` validate the still-unchanged flat renderer payload — no edits needed. `organizationSerialiser.js` and `bankDetailsSerialiser.js` are pure `{success, message, data: payload}` passthroughs with no assumption about `payload`'s internal shape — no edits needed.

---

## Critical Files

- `prisma/schema.prisma` — new, the schema source of truth
- `electron/db/prismaClient.js` — new, replaces `connection.js`
- `electron/db/index.js` — rewritten to a thin re-export barrel (path preserved for `main.js`)
- `electron/db/connection.js`, `electron/db/schema.sql` — deleted
- `electron/services/organizationService.js`, `electron/services/bankDetailsService.js` — raw SQL replaced with Prisma calls
- `electron/transformers/organizationTransformer.js`, `electron/transformers/bankDetailsTransformer.js` — reshaped to nested Prisma `create` input
- `electron/controllers/organizationController.js` — `$transaction`-wrapped `store()`
- `.claude/specs/refactor_org_setup_db.md` — small consistency fix (step 1)
- Not touched: `electron/main.js`, `electron/preload.js`, `src/services/organizationApi.js`, `electron/controllers/index.js`, `electron/services/fileStorageService.js`, `electron/validators/*`, `electron/serialisers/*`, and all of `src/components/setupOrganisation/**`

---

## Verification

Since the IPC wiring is known-broken and intentionally not fixed here, the running app's UI can't exercise this flow yet. Verify directly instead:

1. `npx prisma studio` (against the dev `.env` DB) — confirm all six tables exist with the right columns/relations after the migration from step 5.
2. Write a throwaway `scripts/verify-org.mjs` and run it with `npx electron scripts/verify-org.mjs` (gives access to Electron's `app` module outside the full app, so `getPrismaClient()`'s userData-path resolution works):
   - `await app.whenReady()`, then `initDb()` — confirms `migrate deploy` runs cleanly against the real userData `inventory.db` with no throw.
   - Call `new OrganizationsController().store({ data: <fixture matching today's flat form payload> })`; assert the returned `organization.data.contacts[0].numbers[0].mobileNumber` and `.emails[0].email` round-trip correctly.
   - Call `.show({ data: { id } })`, assert it matches what was created.
   - `getPrismaClient().organization.delete({ where: { id } })`, then re-query each child table by the old FK to confirm cascade-delete removed every `OrganizationContact`/`OrganizationContactNumber`/`OrganizationContactEmail`/`OrganizationAddress`/`OrganizationBankDetail` row.
   - Create two organizations with the same non-null `pan`; confirm the second throws Prisma's `P2002` unique-constraint error.
3. Re-inspect the real `%APPDATA%\inventory\inventory.db` (read-only `node:sqlite` `DatabaseSync({readOnly:true})`, or Prisma Studio pointed at it via a temporary `DATABASE_URL`) to confirm the legacy `organizations`/`organization_bank_details` tables are gone and the new rows persisted.
4. Discard the fixture data (or delete `prisma/dev.db` / the real `inventory.db` and let it regenerate) before considering verification complete — `scripts/verify-org.mjs` is a throwaway, not a deliverable.
