# Organization Database Refactor Specification

## 1. Overview

Refactor the organization-related database schema to support multiple:

* Organization contacts / owners
* Mobile numbers associated with contacts
* Email addresses associated with contacts
* Organization addresses
* Warehouse addresses
* Bank details

The current `organizations` table stores owner details and location details directly on the organization record. This prevents the application from representing multiple contacts or multiple addresses cleanly.

The database should therefore be normalized so that the `organizations` table stores only organization-level information, while contacts and addresses are stored in dedicated child tables.

The existing `organization_bank_details` table should remain a separate table because bank information is sensitive and may require tighter access control than the general organization profile.

The schema and all data access should be defined and managed through **Prisma ORM**, using SQLite as the underlying database (matching the app's existing local-database architecture). Prisma's `schema.prisma` file is the single source of truth for the schema; Prisma Migrate generates and applies the SQL migrations, and Prisma Client is used for all reads/writes instead of hand-written SQL.

---

## 2. Current Problem

The current `organizations` table contains:

* Owner name
* Owner country code
* Owner mobile number
* Owner email
* Country
* State
* Currency
* Timezone
* Street address
* City
* Postal code

This design assumes there is only:

* One owner/contact
* One mobile number
* One organization address

That does not support requirements such as:

* Multiple owners or contacts
* Multiple mobile numbers
* Multiple email addresses
* Different positions such as Owner, Director, Manager, Accountant, etc.
* Multiple office addresses
* Multiple warehouse addresses
* Multiple business locations

These fields should be moved into normalized tables, modeled as Prisma models.

---

# 3. New Database Schema

All models below live in `prisma/schema.prisma`, using Prisma's default naming conventions: `PascalCase` model names become the SQLite table names, and `camelCase` field names become the column names, with no `@map` / `@@map` overrides. This means the underlying table and column names (e.g. `OrganizationContact`, `isPrimary`) differ from the legacy `snake_case` schema (e.g. `organization_contacts`, `is_primary`) described in Section 2 — any existing application code that queries those legacy names will need to be updated to match.

## A. `Organization`

The `organizations` table should contain only information that belongs directly to the organization.

```prisma
model Organization {
  id       Int    @id @default(autoincrement())

  // Step 0: Organization Identity
  name     String
  industry String
  logoPath String?

  // Step 2: Organization Configuration
  currency String
  timezone String

  // Step 3: Business Details
  inventoryStartDate DateTime
  fiscalYear         String
  pan                String? @unique
  gst                String? @unique

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  contacts    OrganizationContact[]
  addresses   OrganizationAddress[]
  bankDetails OrganizationBankDetail[]
}
```

### Optional PAN/GST uniqueness

PAN and GST are optional, so uniqueness should only apply when a value exists. On SQLite (and Prisma's handling of it), a `@unique` constraint on a nullable column already allows any number of `NULL` values while still enforcing uniqueness among non-null values — so a plain `@unique` on `pan` and `gst` is sufficient. No partial/conditional index needs to be hand-written.

---

# 4. Organization Contacts

## A. `OrganizationContact`

Organization contacts should be stored separately because one organization can have multiple people.

Each contact can have:

* Name
* Position
* Primary-contact flag
* Multiple mobile numbers (via `OrganizationContactNumber`)
* Multiple email addresses (via `OrganizationContactEmail`)

Mobile numbers and emails are **not** stored directly on `OrganizationContact`. A single person may need to be reached on more than one number (personal + work) or via more than one email address, so each is broken out into its own child model keyed on the contact.

```prisma
model OrganizationContact {
  id             Int    @id @default(autoincrement())
  organizationId Int
  name           String
  position       String
  isPrimary      Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  numbers      OrganizationContactNumber[]
  emails       OrganizationContactEmail[]
}
```

## B. `OrganizationContactNumber`

Each contact can have multiple mobile numbers. One number can be flagged as the primary number for that contact.

```prisma
model OrganizationContactNumber {
  id           Int    @id @default(autoincrement())
  contactId    Int
  countryCode  String @default("+91")
  mobileNumber String
  isPrimary    Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  contact OrganizationContact @relation(fields: [contactId], references: [id], onDelete: Cascade)
}
```

## C. `OrganizationContactEmail`

Each contact can have multiple email addresses. One email can be flagged as the primary email for that contact.

```prisma
model OrganizationContactEmail {
  id        Int    @id @default(autoincrement())
  contactId Int
  email     String
  isPrimary Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  contact OrganizationContact @relation(fields: [contactId], references: [id], onDelete: Cascade)
}
```

### Example contacts

An organization could have:

| Name         | Position          | Mobile Numbers                 | Emails                                                                                          | Primary Contact |
| ------------ | ----------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------- |
| Rajesh Kumar | Owner             | +91 9876543210, +91 9811122233 | [rajesh@example.com](mailto:rajesh@example.com), [rajesh.k@work.com](mailto:rajesh.k@work.com) | Yes               |
| Priya Sharma | Accountant        | +91 9876543211                 | [priya@example.com](mailto:priya@example.com)                                                   | No                |
| Amit Verma   | Warehouse Manager | +91 9876543212, +91 9812345678 | [amit@example.com](mailto:amit@example.com)                                                     | No                |

This allows the application to add or remove contacts, numbers, and emails independently, without modifying the organization model or any of the other child models.

---

# 5. Organization Addresses

## A. `OrganizationAddress`

Addresses should also be normalized because an organization can have multiple locations.

The model should support different address types such as:

* Registered Office
* Head Office
* Branch
* Warehouse
* Billing
* Shipping
* Other

```prisma
model OrganizationAddress {
  id             Int    @id @default(autoincrement())
  organizationId Int

  name        String
  addressType String

  country    String
  state      String
  city       String?
  street1    String?
  street2    String?
  postalCode String?

  isPrimary Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}
```

### Address type

The application should use a controlled list of address types:

```text
registered_office
head_office
branch
warehouse
billing
shipping
other
```

Prisma's SQLite connector does not support native database enums or `CHECK` constraints directly in `schema.prisma`. The allowed-values list should therefore be enforced primarily at the application layer (e.g. a Zod enum shared by the form and the service layer that calls Prisma Client).

If strict database-level enforcement is also desired, a `CHECK` constraint can be added by hand-editing the SQL inside the generated Prisma Migrate migration file (the `.sql` file under `prisma/migrations/<timestamp>_<name>/migration.sql`) after running `prisma migrate dev --create-only`:

```sql
-- Added by hand to the generated migration.sql
-- (Prisma will not regenerate or remove this on subsequent migrations)
CREATE TABLE "OrganizationAddress" (
    ...
    "addressType" TEXT NOT NULL CHECK (
        "addressType" IN (
            'registered_office',
            'head_office',
            'branch',
            'warehouse',
            'billing',
            'shipping',
            'other'
        )
    ),
    ...
);
```

### Example

One organization can now have:

| Address Type | City     | State         | Primary |
| ------------ | -------- | ------------- | ------- |
| Head Office  | Delhi    | Delhi         | Yes     |
| Warehouse    | Gurugram | Haryana       | No      |
| Warehouse    | Noida    | Uttar Pradesh | No      |
| Branch       | Jaipur   | Rajasthan     | No      |

This solves the requirement for multiple warehouse addresses.

---

# 6. Organization Bank Details

## A. `OrganizationBankDetail`

The bank details model should remain separate from the organization profile.

This provides a clean boundary for potentially sensitive financial information.

```prisma
model OrganizationBankDetail {
  id             Int    @id @default(autoincrement())
  organizationId Int 

  accountHolderName String
  bankName          String
  accountNumber     String
  ifscCode          String
  accountType       String
  // "savings" | "current"

  upiId  String?
  qrPath String?

  isPrimary Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
}
```

`accountType` should be validated as `'savings' | 'current'` at the application layer (e.g. a Zod enum used in the same validator/service that calls Prisma Client). As with `address_type`, a `CHECK` constraint can additionally be hand-added to the generated migration SQL if database-level enforcement is required.

## Important change

The current schema uses:

```sql
organization_id INTEGER PRIMARY KEY
```

This means an organization can have **only one bank account**.

The new Prisma model uses its own primary key:

```prisma
id Int @id @default(autoincrement())
```

with `organizationId` as a plain (non-unique) foreign key:

```prisma
organizationId Int
organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
```

This allows an organization to have multiple bank accounts.

Example:

| Bank       | Account Type | Primary |
| ---------- | ------------ | ------- |
| HDFC Bank  | Current      | Yes     |
| ICICI Bank | Current      | No      |
| SBI        | Savings      | No      |

If the business requirement is strictly one bank account per organization, the separate `id` is not necessary and `organizationId` could be made `@unique`. However, using a one-to-many structure is more flexible and consistent with the new normalized design.

---

# 7. Relationship Diagram

The resulting structure should be:

```text
Organization
      |
      | 1
      |
      +--------------------< OrganizationContact
      |                            |
      |                            | 1
      |                            |
      |                            +--------------------< OrganizationContactNumber
      |                            |
      |                            | 1
      |                            |
      |                            +--------------------< OrganizationContactEmail
      |
      | 1
      |
      +--------------------< OrganizationAddress
      |
      | 1
      |
      +--------------------< OrganizationBankDetail
```

In relational terms:

```text
Organization
    1 ──────── N OrganizationContact

OrganizationContact
    1 ──────── N OrganizationContactNumber

OrganizationContact
    1 ──────── N OrganizationContactEmail

Organization
    1 ──────── N OrganizationAddress

Organization
    1 ──────── N OrganizationBankDetail
```

All child records must reference a valid organization (or, for contact numbers/emails, a valid contact) — Prisma enforces this via `@relation(fields: [...], references: [...])`, which SQLite backs with a real foreign key.

Deleting an organization should automatically delete its:

* Contacts (and each contact's numbers and emails)
* Addresses
* Bank details

Deleting a contact should automatically delete its:

* Mobile numbers
* Email addresses

This is expressed in Prisma with `onDelete: Cascade` on each relation, which Prisma Migrate translates into `ON DELETE CASCADE` on the underlying SQLite foreign key.

---

# 8. Removed Columns From `organizations`

The following columns should be removed from the `organizations` table (and therefore from the `Organization` model) because they now belong in normalized models.

### Owner details

Remove:

```text
owner_name
owner_country_code
owner_mobile_number
owner_email
```

These move to:

```text
OrganizationContact / OrganizationContactNumber / OrganizationContactEmail
```

### Address details

Remove:

```text
country
state
street1
street2
city
postal_code
```

These move to:

```text
OrganizationAddress
```

The following remain organization-level properties:

```text
currency
timezone
```

---

# 9. Final `Organization` Model

The final `Organization` model should therefore contain:

| Field                 | Prisma Type | Constraints                     |
| ---------------------- | ----------- | -------------------------------- |
| `id`                   | `Int`       | `@id @default(autoincrement())`  |
| `name`                 | `String`    | Required                         |
| `industry`             | `String`    | Required                         |
| `logoPath`              | `String?`   | Optional                         |
| `currency`             | `String`    | Required                         |
| `timezone`             | `String`    | Required                         |
| `inventoryStartDate`   | `DateTime`  | Required                         |
| `fiscalYear`           | `String`    | Required                         |
| `pan`                  | `String?`   | Optional, `@unique`              |
| `gst`                  | `String?`   | Optional, `@unique`              |
| `createdAt`            | `DateTime`  | `@default(now())`                |
| `updatedAt`            | `DateTime`  | `@updatedAt`                     |

---

# 10. Final `OrganizationContact` Model

| Field            | Prisma Type | Constraints                                                  |
| ----------------- | ----------- | -------------------------------------------------------------- |
| `id`              | `Int`       | `@id @default(autoincrement())`                                |
| `organizationId`  | `Int`       | FK → `Organization.id`, required, `onDelete: Cascade`           |
| `name`            | `String`    | Required                                                        |
| `position`        | `String`    | Required                                                        |
| `isPrimary`       | `Boolean`   | `@default(false)`                                               |
| `createdAt`       | `DateTime`  | `@default(now())`                                               |
| `updatedAt`       | `DateTime`  | `@updatedAt`                                                     |

## 10a. Final `OrganizationContactNumber` Model

| Field           | Prisma Type | Constraints                                            |
| --------------- | ----------- | -------------------------------------------------------- |
| `id`            | `Int`       | `@id @default(autoincrement())`                          |
| `contactId`     | `Int`       | FK → `OrganizationContact.id`, required, `onDelete: Cascade` |
| `countryCode`   | `String`    | Required, `@default("+91")`                              |
| `mobileNumber`  | `String`    | Required                                                  |
| `isPrimary`     | `Boolean`   | `@default(false)`                                         |
| `createdAt`     | `DateTime`  | `@default(now())`                                         |
| `updatedAt`     | `DateTime`  | `@updatedAt`                                               |

## 10b. Final `OrganizationContactEmail` Model

| Field        | Prisma Type | Constraints                                            |
| ------------ | ----------- | -------------------------------------------------------- |
| `id`         | `Int`       | `@id @default(autoincrement())`                          |
| `contactId`  | `Int`       | FK → `OrganizationContact.id`, required, `onDelete: Cascade` |
| `email`      | `String`    | Required                                                  |
| `isPrimary`  | `Boolean`   | `@default(false)`                                         |
| `createdAt`  | `DateTime`  | `@default(now())`                                         |
| `updatedAt`  | `DateTime`  | `@updatedAt`                                               |

---

# 11. Final `OrganizationAddress` Model

| Field            | Prisma Type | Constraints                                          |
| ----------------- | ----------- | ------------------------------------------------------ |
| `id`              | `Int`       | `@id @default(autoincrement())`                        |
| `organizationId`  | `Int`       | FK → `Organization.id`, required, `onDelete: Cascade`   |
| `name`            | `String`    | Required                                                |
| `addressType`     | `String`    | Required (app-validated against the controlled list)    |
| `country`         | `String`    | Required                                                |
| `state`           | `String`    | Required                                                |
| `city`            | `String?`   | Optional                                                |
| `street1`         | `String?`   | Optional                                                |
| `street2`         | `String?`   | Optional                                                |
| `postalCode`      | `String?`   | Optional                                                |
| `isPrimary`       | `Boolean`   | `@default(false)`                                       |
| `createdAt`       | `DateTime`  | `@default(now())`                                       |
| `updatedAt`       | `DateTime`  | `@updatedAt`                                             |

---

# 12. Final `OrganizationBankDetail` Model

| Field                | Prisma Type | Constraints                                          |
| --------------------- | ----------- | ------------------------------------------------------ |
| `id`                  | `Int`       | `@id @default(autoincrement())`                        |
| `organizationId`      | `Int`       | FK → `Organization.id`, required, `onDelete: Cascade`   |
| `accountHolderName`   | `String`    | Required                                                |
| `bankName`            | `String`    | Required                                                |
| `accountNumber`       | `String`    | Required                                                |
| `ifscCode`            | `String`    | Required                                                |
| `accountType`         | `String`    | Required (app-validated: `savings` \| `current`)        |
| `upiId`               | `String?`   | Optional                                                |
| `qrPath`              | `String?`   | Optional                                                |
| `isPrimary`           | `Boolean`   | `@default(false)`                                       |
| `createdAt`           | `DateTime`  | `@default(now())`                                       |
| `updatedAt`           | `DateTime`  | `@updatedAt`                                             |

---

# 13. Data Ownership Rules

## Organization

Stores organization-level configuration:

* Organization identity
* Industry
* Logo
* Currency
* Timezone
* Inventory start date
* Fiscal year
* PAN
* GST

## Contact

Stores people associated with the organization:

* Name
* Position
* Primary-contact status

## Contact Numbers

Stores mobile numbers associated with a contact:

* Country code
* Mobile number
* Primary-number status

## Contact Emails

Stores email addresses associated with a contact:

* Email address
* Primary-email status

## Address

Stores physical/business locations:

* Registered office
* Head office
* Branch
* Warehouse
* Billing address
* Shipping address
* Other addresses

## Bank Details

Stores financial account information:

* Account holder
* Bank
* Account number
* IFSC
* Account type
* UPI
* QR code
* Primary account status

---

# 14. Migration Considerations

The existing schema already contains organization data in the `organizations` table.

If the database already contains production or development data, do **not** simply run `prisma db push` (which can drop/recreate columns without preserving data). A proper Prisma Migrate migration, with a hand-written data-backfill step, should be performed instead.

The migration should:

1. Add the `OrganizationContact`, `OrganizationContactNumber`, `OrganizationContactEmail`, `OrganizationAddress`, and (if not already present) `OrganizationBankDetail` models to `schema.prisma`.
2. Generate a migration without immediately applying it, so the SQL can be reviewed/edited first:
   ```bash
   npx prisma migrate dev --create-only --name normalize_organization_contacts_addresses
   ```
3. In the generated `migration.sql`, after the new tables are created, add hand-written SQL (or a follow-up Node script run via Prisma Client, see step 6) to:
   * Copy each organization's existing owner information into a new `OrganizationContact` row.
   * Copy the existing owner mobile number into `OrganizationContactNumber`, marked `isPrimary = true`.
   * Copy the existing owner email into `OrganizationContactEmail`, marked `isPrimary = true`.
   * Copy existing organization address information into a new `OrganizationAddress` row.
4. Remove the old owner/address columns from `organizations` in the same migration, once the data has been copied out.
5. Apply the migration:
   ```bash
   npx prisma migrate dev
   ```
6. If the data backfill is easier to express in JavaScript than in raw SQL (e.g. splitting a combined `owner_mobile_number` string, or validating data before insert), it can instead be done with a one-off script using `PrismaClient` that runs between step 2 (schema/table creation) and step 4 (dropping the old columns) — for example a script invoked from `prisma/migrations/.../migration.sql` via a placeholder, or run manually as an ordered deploy step. The important part is that data is copied before the old columns are dropped.
7. Preserve existing organization IDs — the migration must not recreate the `organizations` table with new IDs.
8. Preserve existing bank details.
9. Verify foreign-key relationships, including `OrganizationContactNumber` / `OrganizationContactEmail` → `OrganizationContact`.
10. Verify that no existing organization data is lost (spot-check row counts before/after).

For a fresh database, the schema can be created directly with:

```bash
npx prisma migrate dev --name init
```

---

# 15. Prisma Implementation Rules

Use Prisma ORM instead of hand-written `sqlite3` queries.

Requirements:

* Use `@prisma/client` (generated client) for all application reads/writes.
* Define all tables as models in `prisma/schema.prisma`, with the SQLite provider:
  ```prisma
  datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
  }
  ```
* Never construct SQL using string formatting or interpolation. If a raw query is unavoidable, use Prisma's tagged-template `$queryRaw` / `$executeRaw`, which parameterizes values automatically — never `$queryRawUnsafe` / `$executeRawUnsafe` with interpolated input.
* Foreign keys are enabled by default for SQLite connections made through Prisma Client; no manual `PRAGMA foreign_keys = ON` is required.
* Use a single shared `PrismaClient` instance (not one per request) to avoid exhausting SQLite connections.
* Use `prisma migrate dev` for local schema changes and `prisma migrate deploy` for applying committed migrations in packaged/production builds — never `prisma db push` against a database that holds real data.
* Run `npx prisma generate` after any schema change so the generated client stays in sync.
* Use `onDelete: Cascade` on every organization child relation (`OrganizationContact`, `OrganizationContactNumber`, `OrganizationContactEmail`, `OrganizationAddress`, `OrganizationBankDetail`).
* Preserve UTC timestamp format. Prisma's SQLite connector stores `DateTime` values as ISO-8601 text, which matches the existing:
  ```text
  YYYY-MM-DDTHH:MM:SS.sssZ
  ```
  format already used by the app; `@default(now())` and `@updatedAt` should be used instead of hand-written `strftime` defaults.

---

# 16. Expected Behavior

### Multiple Contacts

An organization can have multiple contacts.

Example:

```text
Organization
 ├── Owner
 ├── Director
 ├── Accountant
 └── Warehouse Manager
```

Each person can have their own:

* Name
* Position
* One or more mobile numbers
* One or more email addresses

### Multiple Mobile Numbers and Emails per Contact

A single contact can have more than one mobile number and more than one email address.

Example:

```text
Rajesh Kumar (Owner)
 ├── Mobile: +91 9876543210 (primary)
 ├── Mobile: +91 9811122233
 ├── Email: rajesh@example.com (primary)
 └── Email: rajesh.k@work.com
```

One number can be marked primary for a contact, and one email can be marked primary for a contact, using `isPrimary`.

### Multiple Addresses

An organization can have multiple addresses.

Example:

```text
Organization
 ├── Head Office
 ├── Warehouse 1
 ├── Warehouse 2
 └── Branch Office
```

### Multiple Bank Accounts

An organization can have multiple bank accounts.

Example:

```text
Organization
 ├── HDFC Current Account
 ├── ICICI Current Account
 └── SBI Savings Account
```

One record can be marked as the primary record using `isPrimary`.

---

# 17. Database Constraints

The database must enforce:

* Organization IDs referenced by child records must exist — enforced by Prisma relation FKs.
* Contact IDs referenced by `OrganizationContactNumber` and `OrganizationContactEmail` must exist — enforced by Prisma relation FKs.
* Deleting an organization cascades to child records — `onDelete: Cascade`.
* Deleting a contact cascades to its numbers and emails — `onDelete: Cascade`.
* PAN must be unique when present — `pan String? @unique`.
* GST must be unique when present — `gst String? @unique`.
* Bank account type must be `savings` or `current` — enforced at the application/validation layer (Zod), optionally reinforced with a hand-added `CHECK` in the migration SQL.
* `isPrimary` is a `Boolean` (SQLite-backed `0`/`1`) — enforced by the Prisma column type.
* Required organization fields cannot be null — enforced by non-optional Prisma field types.
* Required contact fields cannot be null — enforced by non-optional Prisma field types.
* Required contact number fields cannot be null — enforced by non-optional Prisma field types.
* Required contact email fields cannot be null — enforced by non-optional Prisma field types.
* Required address fields cannot be null — enforced by non-optional Prisma field types.
* Required bank fields cannot be null — enforced by non-optional Prisma field types.

---

# 18. Definition of Done

* [ ] `Organization` model contains only organization-level fields.
* [ ] Owner/contact fields are removed from `Organization`.
* [ ] Address fields are removed from `Organization`.
* [ ] `OrganizationContact` model exists.
* [ ] Multiple contacts can be associated with one organization.
* [ ] Each contact can have a name.
* [ ] Each contact can have a position.
* [ ] One contact can be marked as primary.
* [ ] `OrganizationContactNumber` model exists.
* [ ] Each contact can have multiple mobile numbers.
* [ ] One mobile number per contact can be marked as primary.
* [ ] `OrganizationContactEmail` model exists.
* [ ] Each contact can have multiple email addresses.
* [ ] One email per contact can be marked as primary.
* [ ] `OrganizationAddress` model exists.
* [ ] Multiple addresses can be associated with one organization.
* [ ] Warehouse addresses are supported.
* [ ] Office/branch/billing/shipping addresses are supported.
* [ ] One address can be marked as primary.
* [ ] `OrganizationBankDetail` remains a separate model from organization data.
* [ ] Multiple bank accounts can be associated with one organization.
* [ ] One bank account can be marked as primary.
* [ ] All foreign keys use Prisma relations (`@relation`) and are enforced by SQLite.
* [ ] Organization child models use `onDelete: Cascade`.
* [ ] PAN uniqueness is enforced when present (`@unique`).
* [ ] GST uniqueness is enforced when present (`@unique`).
* [ ] Existing data is preserved during migration.
* [ ] Prisma ORM is used for schema definition and all data access — no hand-written SQL for normal CRUD paths.
* [ ] Any unavoidable raw queries use Prisma's parameterized `$queryRaw`/`$executeRaw` tagged templates — never string-built SQL.
* [ ] `npx prisma generate` is run after schema changes so the client stays in sync.
* [ ] `npx prisma migrate deploy` is safe to run repeatedly against the packaged app's database.
* [ ] Existing organization IDs remain unchanged during migration.
