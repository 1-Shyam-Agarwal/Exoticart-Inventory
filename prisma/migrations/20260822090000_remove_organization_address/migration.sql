-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "logoPath" TEXT,
    "currency" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "inventoryStartDate" DATETIME NOT NULL,
    "fiscalYear" TEXT NOT NULL,
    "pan" TEXT,
    "gst" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Organization" ("id", "name", "industry", "logoPath", "currency", "timezone", "country", "state", "inventoryStartDate", "fiscalYear", "pan", "gst", "createdAt", "updatedAt")
SELECT
    o."id", o."name", o."industry", o."logoPath", o."currency", o."timezone",
    COALESCE((SELECT a."country" FROM "OrganizationAddress" a WHERE a."organizationId" = o."id" ORDER BY a."id" LIMIT 1), ''),
    COALESCE((SELECT a."state" FROM "OrganizationAddress" a WHERE a."organizationId" = o."id" ORDER BY a."id" LIMIT 1), ''),
    o."inventoryStartDate", o."fiscalYear", o."pan", o."gst", o."createdAt", o."updatedAt"
FROM "Organization" o;
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
CREATE UNIQUE INDEX "Organization_pan_key" ON "Organization"("pan");
CREATE UNIQUE INDEX "Organization_gst_key" ON "Organization"("gst");
DROP TABLE "OrganizationAddress";
PRAGMA foreign_keys=ON;
