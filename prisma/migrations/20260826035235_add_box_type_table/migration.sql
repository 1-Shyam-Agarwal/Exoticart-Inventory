-- CreateTable
CREATE TABLE "BoxType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "numberOfItems" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "BoxType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BoxType_organizationId_name_key" ON "BoxType"("organizationId", "name");
