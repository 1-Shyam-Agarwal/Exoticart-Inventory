import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { AppNavbar } from '../components/molecules/dashboard/AppNavbar';
import { DashboardHeader } from '../components/molecules/dashboard/DashboardHeader';
import { SideMenu } from '../components/organisms/dashboard/SideMenu';
import { DashboardMainGrid } from '../components/organisms/dashboard/DashboardMainGrid';

import { listOrganizations } from '../services/organization';

function Dashboard() {
  const { id } = useParams();

  const { data: organizations, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: listOrganizations,
  });

  const organization = organizations?.all.find((org) => String(org.id) === String(id));

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.main', minHeight: '100vh' }}>
      <SideMenu organizationName={organization?.name} industry={organization?.industry} />
      <AppNavbar />

      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
          {isLoading ? (
            <Stack spacing={1.5} sx={{ pt: 12, alignItems: 'center' }}>
              <CircularProgress size={28} aria-label="Loading…" />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Loading dashboard…
              </Typography>
            </Stack>
          ) : (
            <>
              <DashboardHeader organizationName={organization?.name} />
              <DashboardMainGrid />
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default Dashboard;
