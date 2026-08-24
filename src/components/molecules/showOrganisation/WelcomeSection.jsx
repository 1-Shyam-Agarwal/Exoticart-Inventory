import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function getGreeting(hour) {
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function WelcomeSection() {
  const greeting = getGreeting(new Date().getHours());

  return (
    <Box
        component="section"
    >
      <Typography
        sx={{
          fontFamily: 'typography.main',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          fontSize: { xs: '1.875rem', sm: '2.25rem' },
          background: 'linear-gradient(to right, #DD2C00 0%, #FF9100 50%, #FFC400 100%)',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {greeting}, Nizam Khan
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 1,
          fontSize: '1.125rem',
          color: 'text.secondary',
        }}
      >
        Welcome back to Smart Inventory!
      </Typography>
    </Box>
  );
}
