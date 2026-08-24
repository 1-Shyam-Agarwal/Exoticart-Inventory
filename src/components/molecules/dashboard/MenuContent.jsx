import { useNavigate, useParams, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Products', icon: <DashboardRoundedIcon />, path: 'products' },
  { text: 'Inventory', icon: <Inventory2RoundedIcon /> },
  { text: 'Orders', icon: <ReceiptLongRoundedIcon /> },
  { text: 'Suppliers', icon: <LocalShippingRoundedIcon /> },
  { text: 'Analytics', icon: <AssessmentRoundedIcon />, path: 'analytics' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'Help', icon: <HelpRoundedIcon /> },
];

export function MenuContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => {
          const to = item.path ? `/org/active/${id}/${item.path}` : undefined;
          const selected = to ? location.pathname === to : false;

          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton selected={selected} onClick={to ? () => navigate(to) : undefined}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
