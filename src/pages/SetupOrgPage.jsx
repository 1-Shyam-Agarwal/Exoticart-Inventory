import Box from '@mui/material/Box';
import AppHeader from '../components/molecules/showOrganisation/AppHeader';
import MultiStepForm from '../components/organisms/setupOrganisation/MultiStepForm';

function SetupOrgPage() {
  return (
    <Box
      sx={{
        bgcolor: 'background.main',
        minHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      <AppHeader />
      <MultiStepForm />
    </Box>
  );
}

export default SetupOrgPage;
