
-- organization table
CREATE TABLE IF NOT EXISTS organizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Step 0: Organization Identity
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  logo_path TEXT,

  -- Step 1: Owner Details
  owner_name TEXT NOT NULL,
  owner_country_code TEXT NOT NULL DEFAULT '+91',
  owner_mobile_number TEXT NOT NULL,
  owner_email TEXT NOT NULL,

  -- Step 2: Location
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  currency TEXT NOT NULL,
  timezone TEXT NOT NULL,
  street1 TEXT,
  street2 TEXT,
  city TEXT,
  postal_code TEXT,

  -- Step 3: Business Details
  inventory_start_date TEXT NOT NULL,
  fiscal_year TEXT NOT NULL,
  pan TEXT,
  gst TEXT,

  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- pan/gst are optional in businessDetailsSchema, so only enforce
-- uniqueness when a value is actually present.
CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_pan
  ON organizations (pan) WHERE pan IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_gst
  ON organizations (gst) WHERE gst IS NOT NULL;

-- Step 4: Bank Details, split into its own table so it can later get
-- tighter access control than the rest of the org profile.
CREATE TABLE IF NOT EXISTS organization_bank_details (
  organization_id INTEGER PRIMARY KEY 
    REFERENCES organizations (id) ON DELETE CASCADE,

  account_holder_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  ifsc_code TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('savings', 'current')),
  upi_id TEXT,
  qr_path TEXT,

  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
