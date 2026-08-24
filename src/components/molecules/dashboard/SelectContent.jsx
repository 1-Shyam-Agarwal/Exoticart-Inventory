import { useNavigate } from 'react-router-dom';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { selectClasses } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.border.soft}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export function SelectContent({ organizationName, industry }) {
  const navigate = useNavigate();

  function handleChange(event) {
    if (event.target.value === 'switch') {
      navigate('/');
    }
  }

  return (
    <Select
      labelId="organization-select"
      id="organization-simple-select"
      value="current"
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select organization' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': { p: '8px' },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>Organization</ListSubheader>
      <MenuItem value="current">
        <ListItemAvatar>
          <Avatar alt={organizationName}>
            <ApartmentRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={organizationName || 'Loading…'} secondary={industry} />
      </MenuItem>
      <Divider sx={{ mx: -1 }} />
      <MenuItem value="switch">
        <ListItemIcon>
          <SwapHorizRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Switch organization" />
      </MenuItem>
    </Select>
  );
}
