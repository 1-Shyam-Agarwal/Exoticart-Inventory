import { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { SideMenuMobile } from './SideMenuMobile';
import { MenuButton } from '../../atoms/dashboard/MenuButton';

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.list}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export function AppNavbar() {
  const [open, setOpen] = useState(false);

  function toggleDrawer(newOpen) {
    return () => setOpen(newOpen);
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'border.soft',
      }}
    >
      <Toolbar variant="regular">
        <Stack direction="row" sx={{ alignItems: 'center', flexGrow: 1, width: '100%', gap: 1 }}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mr: 'auto' }}>
            <Box
              sx={{
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '999px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
              Dashboard
            </Typography>
          </Stack>
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
