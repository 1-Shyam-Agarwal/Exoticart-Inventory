import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import developerLogo from '../../../../public/assets/developer_logo.png';

export function CreateOrganizationCard() {
  return (
    <Box sx={{ mt: 0.5, mx: 2.5 }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1.5, fontWeight: 400 }}
      >
        Get started
      </Typography>

      <Button
        type="button"
        variant="outlined"
        fullWidth
        sx={{
          p: 2.5,
          textTransform: 'none',
          justifyContent: 'flex-start',
          bgcolor: 'background.paper',
          borderColor: 'border.soft',
          '&:hover': {
            borderColor: 'border.main',
            bgcolor: 'background.muted',
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={developerLogo}
            alt="Developer Logo"
            sx={{ width: 56, height: 56, objectFit: 'contain' }}
          />

          <Stack spacing={0.5} sx={{ alignItems: 'flex-start'}}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: 'text.primary' }}>
              Set up your organization
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, lineHeight: 1.25, color: 'text.secondary' }}
            >
              Integrate Smart Inventory to super-charge your business.
            </Typography>
          </Stack>
        </Stack>
      </Button>
    </Box>
  );
}
