import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { stepTitleSx } from "./styles"

/** Shared step shell — title + vertical field stack */
export default function StepLayout({ title, children }) {
  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
        {title}
      </Typography>
      <Stack spacing={4}>{children}</Stack>
    </Box>
  )
}
