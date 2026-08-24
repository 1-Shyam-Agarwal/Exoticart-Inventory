import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReplayIcon from '@mui/icons-material/Replay';

const Error = ({ error, refetch }) => {
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
        <WarningAmberIcon sx={{ fontSize: 28, color: 'error.main' }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {error?.message || 'Something went wrong.'}
        </Typography>
        <Button
            onClick={refetch}
            variant="outlined"
            size="small"
            startIcon={<ReplayIcon fontSize="small" />}
            sx={{
                textTransform: 'none',
                borderRadius: 1,
                borderColor: 'border.main',
                color: 'text.primary',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'background.muted',
                },
            }}
        >
            Retry
        </Button>
    </Stack>
  )
}

export default Error