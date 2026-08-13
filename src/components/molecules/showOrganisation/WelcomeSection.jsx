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
        aria-labelledby="welcome-heading"
        sx={{
            padding: '2.1rem',
            paddingLeft: '4.2rem',
        }}
    >
      <Typography
        id="welcome-heading"
        variant="h4"
        sx={{
          fontFamily: 'typography.main',
          fontWeight: 500,
          letterSpacing: '0.005em',
          fontSize: { xs: '1.875rem', sm: '2.25rem' },
          background: 'linear-gradient(to right, #e11d48 0%, #f97316 10%, #eab308 60%, #eab308 100%)',
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
