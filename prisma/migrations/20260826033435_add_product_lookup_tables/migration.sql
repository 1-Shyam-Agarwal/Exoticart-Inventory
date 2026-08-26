-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "Category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "Brand_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturer" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "Manufacturer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unit" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "Unit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DimensionUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dimensionUnit" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "DimensionUnit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeightUnit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weightUnit" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "WeightUnit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_organizationId_category_key" ON "Category"("organizationId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_organizationId_brand_key" ON "Brand"("organizationId", "brand");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_organizationId_manufacturer_key" ON "Manufacturer"("organizationId", "manufacturer");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_organizationId_unit_key" ON "Unit"("organizationId", "unit");

-- CreateIndex
CREATE UNIQUE INDEX "DimensionUnit_organizationId_dimensionUnit_key" ON "DimensionUnit"("organizationId", "dimensionUnit");

-- CreateIndex
CREATE UNIQUE INDEX "WeightUnit_organizationId_weightUnit_key" ON "WeightUnit"("organizationId", "weightUnit");
