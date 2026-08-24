import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SelectContent } from '../../molecules/dashboard/SelectContent';
import { MenuContent } from '../../molecules/dashboard/MenuContent';
import { CardAlert } from '../../molecules/dashboard/CardAlert';
import { OptionsMenu } from '../../molecules/dashboard/OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export function SideMenu({ organizations, currentOrgId }) {
  const currentOrg = organizations?.find((org) => String(org.id) === String(currentOrgId));

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
          borderColor: 'border.soft',
        },
      }}
    >
      <Box sx={{ display: 'flex', p: 1.5 }}>
        <SelectContent organizations={organizations} currentOrgId={currentOrgId} />
      </Box>
      <Divider sx={{ borderColor: 'border.soft' }} />
      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <MenuContent />
        <CardAlert />
      </Box>
    </Drawer>
  );
}
