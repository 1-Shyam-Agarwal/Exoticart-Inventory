import { Controller, useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

export default function StepOrganizationIdentity() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box>
      <Typography variant="h6">Org Identity</Typography>
    </Box>
  )
}
