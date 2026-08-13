import BusinessIcon from "@mui/icons-material/Business"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined"
import { z } from "zod"
import {
  organizationIdentitySchema,
  ownerDetailsSchema,
  locationSchema,
  businessDetailsSchema,
  bankDetailsSchema,
} from "../../validation/schema"

export const steps = [
  {
    id: 1,
    title: "Organization Identity",
    icon: <BusinessIcon />,
  },
  {
    id: 2,
    title: "Owner Details",
    icon: <PersonIcon />,
  },
  {
    id: 3,
    title: "Location",
    icon: <LocationOnIcon />,
  },
  {
    id: 4,
    title: "Business Details",
    icon: <WorkHistoryIcon />,
  },
  {
    id: 5,
    title: "Bank Details",
    icon: <AccountBalanceIcon />,
  },
  {
    id: 6,
    title: "Review",
    icon: <FactCheckOutlinedIcon />,
  },
]

export const STEP_FIELDS = [
  ["name", "industry", "logoFile"],
  ["ownerName", "countryCode", "mobileNumber", "email"],
  [
    "country",
    "state",
    "currency",
    "timezone",
    "street1",
    "street2",
    "city",
    "postalCode",
  ],
  ["inventoryStartDate", "fiscalYear", "pan", "gst"],
  [
    "accountHolderName",
    "bankName",
    "accountNumber",
    "ifscCode",
    "accountType",
    "upiId",
    "qrFile",
  ],
  [],
]

export const stepSchemas = [
  organizationIdentitySchema,
  ownerDetailsSchema,
  locationSchema,
  businessDetailsSchema,
  bankDetailsSchema,
  z.object({}),
]
