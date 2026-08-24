import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

const Loader = () => {
  return (
    <Stack
        spacing={1.5}
        sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
        }}
    >
        <CircularProgress size={28} aria-label="Loading…" />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Fetching organisations…
        </Typography>
    </Stack>
  )
}

export default Loader