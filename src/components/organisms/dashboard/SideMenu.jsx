import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import { SelectContent } from '../../molecules/dashboard/SelectContent';
import { MenuContent } from '../../molecules/dashboard/MenuContent';
import { CardAlert } from '../../molecules/dashboard/CardAlert';

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})(({ theme, collapsed }) => {
  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return {
    width,
    flexShrink: 0,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [`& .${drawerClasses.paper}`]: {
      width,
      boxSizing: 'border-box',
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  };
});

export function SideMenu({ organizations, currentOrgId }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [orgMenuAnchor, setOrgMenuAnchor] = useState(null);

  const currentOrg = organizations?.find((org) => String(org.id) === String(currentOrgId));

  const handleSelectOrg = (orgId) => {
    setOrgMenuAnchor(null);
    if (String(orgId) !== String(currentOrgId)) {
      navigate(`/org/active/${orgId}`);
    }
  };

  return (
    <Drawer
      variant="permanent"
      collapsed={collapsed}
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
          borderColor: 'border.soft',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1.5 }}>
        {collapsed ? (
          <>
            <Tooltip title={currentOrg?.name ?? 'Switch organization'} placement="right">
              <IconButton
                size="small"
                onClick={(event) => setOrgMenuAnchor(event.currentTarget)}
                aria-label="Switch organization"
                aria-haspopup="true"
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    border: 1,
                    borderColor: 'border.soft',
                  }}
                >
                  <ApartmentRoundedIcon sx={{ fontSize: '1rem' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              open={Boolean(orgMenuAnchor)}
              anchorEl={orgMenuAnchor}
              onClose={() => setOrgMenuAnchor(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              slotProps={{ paper: { sx: { minWidth: 220 } } }}
            >
              <ListSubheader sx={{ pt: 0, lineHeight: 2.5 }}>Organization</ListSubheader>
              {(organizations ?? []).map((org) => (
                <MenuItem
                  key={org.id}
                  selected={String(org.id) === String(currentOrgId)}
                  onClick={() => handleSelectOrg(org.id)}
                >
                  <ListItemAvatar sx={{ minWidth: 0, mr: 1.5 }}>
                    <Avatar
                      alt={org.name}
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                        border: 1,
                        borderColor: 'border.soft',
                      }}
                    >
                      <ApartmentRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={org.name} secondary={org.industry} />
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <SelectContent organizations={organizations} currentOrgId={currentOrgId} />
        )}
      </Box>

      <Divider sx={{ borderColor: 'border.soft' }} />

      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <MenuContent collapsed={collapsed} />
        {!collapsed && <CardAlert />}
      </Box>

      <Divider sx={{ borderColor: 'border.soft' }} />

      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', p: 0.5 }}>
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
          <IconButton
            size="small"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
