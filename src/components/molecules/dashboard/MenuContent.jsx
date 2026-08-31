import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { NestedMenuItem } from './NestedMenuItem';

const mainListItems = [
  { text: 'Products', icon: <DashboardRoundedIcon />, path: 'products' },
  {
    text: 'Inventory',
    icon: <Inventory2RoundedIcon />,
    submenu: [
      { text: 'Stock Levels', path: 'inventory/stock' },
      { text: 'Warehouses', path: 'inventory/warehouses' },
      { text: 'Transfers', path: 'inventory/transfers' },
    ],
  },
  {
    text: 'Purchases',
    icon: <ReceiptLongRoundedIcon />,
    submenu: [
      { text: 'Vendors', path: 'purchases/vendors' },
      { text: 'Outbound', path: 'orders/outbound' },
    ],
  },
  {
    text: 'Suppliers',
    icon: <LocalShippingRoundedIcon />,
    submenu: [
      { text: 'Active Suppliers', path: 'suppliers/active' },
      { text: 'Purchase Orders', path: 'suppliers/purchase-orders' },
    ],
  },
  { text: 'Analytics', icon: <AssessmentRoundedIcon />, path: 'analytics' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'Help', icon: <HelpRoundedIcon /> },
];

export function MenuContent({ collapsed = false }) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <NestedMenuItem key={item.text} item={item} collapsed={collapsed} />
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item) => {
          const button = (
            <ListItemButton
              sx={{
                pl: 1,
                minHeight: collapsed ? 48 : 40,
                py: collapsed ? 1.75 : 1,
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : undefined }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          );

          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              {collapsed ? (
                <Tooltip title={item.text} placement="right">
                  {button}
                </Tooltip>
              ) : (
                button
              )}
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
