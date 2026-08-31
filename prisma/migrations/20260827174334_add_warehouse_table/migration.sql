-- CreateTable
CREATE TABLE "Warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "warehouse" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "Warehouse_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_organizationId_warehouse_key" ON "Warehouse"("organizationId", "warehouse");

