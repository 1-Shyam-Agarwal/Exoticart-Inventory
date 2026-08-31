import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
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

  // The closed box stays a single compact line: avatar + name only. The menu
  // items below still show the industry, where the extra room exists and the
  // detail actually helps tell two organizations apart.
  function renderValue(value) {
    const org = organizations.find((item) => String(item.id) === String(value));

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
        <ListItemAvatar>
          <Avatar alt={org?.name}>
            <ApartmentRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <Typography noWrap sx={{ minWidth: 0 }}>
          {org?.name ?? 'Select organization'}
        </Typography>
      </Box>
    );
  }

  return (
    <Select
      labelId="organization-select"
      id="organization-simple-select"
      value={currentOrgId != null ? String(currentOrgId) : ''}
      onChange={handleChange}
      displayEmpty
      renderValue={renderValue}
      inputProps={{ 'aria-label': 'Select organization' }}
      fullWidth
      sx={{
        maxHeight: 44,
        width: 215,
        '&.MuiList-root': { p: '8px' },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
          // A flex child will not shrink below its content width without this,
          // so the name would overflow the arrow instead of ellipsizing.
          minWidth: 0,
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
