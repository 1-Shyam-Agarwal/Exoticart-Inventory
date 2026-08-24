import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
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
    <>


      <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
        {isLoading ? (
          <Stack spacing={1.5} sx={{ minHeight: '70vh', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={28} aria-label="Loading…" />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Loading dashboard…
            </Typography>
          </Stack>
        ) : (
          <>
            <DashboardMainGrid />
          </>
        )}
      </Stack>
    </>
  );
}

export default Dashboard;
