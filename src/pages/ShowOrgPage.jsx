import Box from '@mui/material/Box';
import AppHeader from '../components/molecules/showOrganisation/AppHeader';
import { WelcomeSection } from '../components/molecules/showOrganisation/WelcomeSection';
import { CreateOrganizationCard } from '../components/molecules/showOrganisation/CreateOrgCard';
import { SampleAppsSection } from '../components/organisms/showOrganisation/SampleAppSection';

function ShowOrgPage() {
  return (
    <Box sx={{ bgcolor: 'background.main', minHeight: '100vh' }}>
      <AppHeader />
      <WelcomeSection />
      <CreateOrganizationCard />
      <SampleAppsSection />
    </Box>
  );
}

export default ShowOrgPage;
