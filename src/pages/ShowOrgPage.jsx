import Box from '@mui/material/Box';
import AppHeader from '../components/molecules/showOrganisation/AppHeader';
import { WelcomeSection } from '../components/molecules/showOrganisation/WelcomeSection';
import { CreateOrganizationCard } from '../components/molecules/showOrganisation/CreateOrgCard';
import { SampleAppsSection } from '../components/organisms/showOrganisation/SampleAppSection';
import { ShowOrgSection } from '../components/organisms/showOrganisation/ShowOrgSection';

function ShowOrgPage() {
  return (
    <Box sx={{ bgcolor: 'background.main', minHeight: '100vh' }}>
      <AppHeader />

      <Box
        component="main"
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 3, sm: 5, lg: 10 },
          py: 5,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'flex-start',
          gap: { xs: 5, lg: 8 },
        }}
      >
        <Box sx={{ width: { xs: '100%', lg: '50%' }, flexShrink: 0 }}>
          <WelcomeSection />
          <CreateOrganizationCard />
          <SampleAppsSection />
        </Box>

        <Box sx={{ width: { xs: '100%', lg: '50%' }, pt: { lg: 12 } }}>
          <ShowOrgSection />
        </Box>
      </Box>
    </Box>
  );
}

export default ShowOrgPage;
