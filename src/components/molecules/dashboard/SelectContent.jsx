import { useNavigate } from 'react-router-dom';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

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

export function SelectContent({ organizations = [], currentOrgId }) {
  const navigate = useNavigate();

  function handleChange(event) {
    const orgId = event.target.value;
    if (String(orgId) !== String(currentOrgId)) {
      navigate(`/org/active/${orgId}`);
    }
  }

  return (
    <Select
      labelId="organization-select"
      id="organization-simple-select"
      value={currentOrgId != null ? String(currentOrgId) : ''}
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
      {organizations.map((org) => (
        <MenuItem key={org.id} value={String(org.id)}>
          <ListItemAvatar>
            <Avatar alt={org.name}>
              <ApartmentRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={org.name} secondary={org.industry} />
        </MenuItem>
      ))}
    </Select>
  );
}
