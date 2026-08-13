import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

/** Checkout-style field column primitive */
export const FormGrid = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const underlineFieldSx = {
  "& .MuiInputBase-root": {
    height: 40,
    alignItems: "flex-end",
    backgroundColor: "transparent",
    "&:before": {
      borderBottomColor: "border.main",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "border.main",
    },
    "&:after": {
      borderBottomWidth: 1,
      borderBottomColor: "primary.main",
    },
  },
  "& .MuiInputBase-input": {
    px: 0,
    py: 1,
    fontSize: "0.875rem",
    color: "text.primary",
    "&::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
  },
}

export const autocompletePaperSx = {
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "border.main",
}

export const stepTitleSx = {
  mb: 4,
  fontFamily: (theme) => theme.typography.main,
  fontSize: "1.875rem",
  fontWeight: 400,
  lineHeight: 1.2,
  color: "text.primary",
}

export const linkButtonSx = {
  alignSelf: "flex-start",
  p: 0,
  minWidth: 0,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  color: "primary.main",
  "&:hover": {
    bgcolor: "transparent",
    textDecoration: "underline",
  },
}

export const ghostButtonSx = {
  height: 40,
  px: 2.5,
  minWidth: 0,
  borderRadius: 9999,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  color: "text.secondary",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "action.hover",
    color: "text.primary",
    boxShadow: "none",
  },
}

export const primaryButtonSx = {
  height: 40,
  px: 4,
  borderRadius: 9999,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  bgcolor: "primary.main",
  color: "primary.contrastText",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "primary.main",
    opacity: 0.8,
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    opacity: 0.5,
    color: "primary.contrastText",
    bgcolor: "primary.main",
  },
}
