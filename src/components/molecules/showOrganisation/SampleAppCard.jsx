import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function SampleAppCard({ description, icon: Icon, title }) {
  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      sx={{
        p: 2.5,
        textTransform: 'none',
        justifyContent: 'flex-start',
        whiteSpace: 'normal',
        bgcolor: 'background.main',
        borderColor: 'border.soft',
        '&:hover': {
          borderColor: 'border.main',
          bgcolor: 'background.muted',
        },
      }}
    >   
      <Stack
        direction="row"
        spacing={2.5}
        sx={{ alignItems: 'center' }}
      >
        {Icon ? <Icon sx={{ fontSize: 36 , color: '#FF9100' }} /> : null}

        <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.25, color: 'text.secondary' }}
          >
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
}
