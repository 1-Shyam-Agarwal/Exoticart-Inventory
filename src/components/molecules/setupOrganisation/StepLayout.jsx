import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { stepTitleSx } from "./styles"

export default function StepLayout({ title, children }) {
  return (
    <Box sx={{ flex:1 }}>
      <Typography component="h2" sx={stepTitleSx}>
        {title}
      </Typography>
      <Stack spacing={4}>{children}</Stack>
    </Box>
  )
}
