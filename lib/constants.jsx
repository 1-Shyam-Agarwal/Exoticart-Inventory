import BusinessIcon from "@mui/icons-material/Business"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined"

export const onBoardingSteps = [
  {
    id: 1,
    title: "Organization Identity",
    icon: <BusinessIcon />,
  },
  {
    id: 2,
    title: "Stakeholder Details",
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

function startOfToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export const defaultFormValues = {
  name: "",
  industry: "",
  logoFile: undefined,
  logoPreview: null,

  owners: [
    {
      name: "",
      position: "",
      numbers: [{ countryCode: "+91", mobileNumber: "" }],
      emails: [{ email: "" }],
    },
  ],

  country: "India",
  state: "",
  currency: "INR",
  timezone: "Asia/Calcutta",

  inventoryStartDate: startOfToday(),
  fiscalYear: "April - March",
  pan: "",
  gst: "",

  bankAccounts: [
    {
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "",
      upiId: "",
      qrFile: undefined,
      qrPreview: null,
    },
  ],
}
