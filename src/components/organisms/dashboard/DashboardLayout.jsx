import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';

import { SideMenu } from './SideMenu';
import { listOrganizations } from '../../../services/organization';

export function DashboardLayout() {
  const { id } = useParams();

  const { data: organizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: listOrganizations,
  });

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.main', minHeight: '100vh' }}>
      <SideMenu organizations={organizations?.activeOrgs} currentOrgId={id} />

      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
