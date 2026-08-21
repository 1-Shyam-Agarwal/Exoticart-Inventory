/*
  Warnings:

  - You are about to drop the `OrganizationSetup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrganizationSetup";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrganizationDraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "data" JSONB NOT NULL,
    "logoPath" TEXT,
    "qrPath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
