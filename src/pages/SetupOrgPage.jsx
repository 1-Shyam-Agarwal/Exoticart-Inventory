import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppHeader from '../components/molecules/showOrganisation/AppHeader';
import MultiStepForm from '../components/organisms/setupOrganisation/MultiStepForm';

function SetupOrgPage() {
  return (
    <Box
      sx={{
        bgcolor: 'background.main',
        minHeight: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
    >
      <AppHeader />
      <MultiStepForm />
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Set up your organization
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
          Organization setup will go here.
        </Typography>
      </Box>
    </Box>
  );
}

export default SetupOrgPage;
