import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export function NestedMenuItemChild({ item, level = 1, inFlyout = false, onNavigate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const to = item.path ? `/org/active/${id}/${item.path}` : undefined;
  const isSelected = to ? location.pathname === to : false;

  const handleClick = () => {
    if (to) {
      navigate(to);
      onNavigate?.();
    }
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        selected={isSelected}
        onClick={handleClick}
        sx={{
          pl: inFlyout ? 2 : `${level * 16 + 24}px`,
          pr: inFlyout ? 2 : undefined,
          minHeight: 32,
          py: 0.5,
        }}
      >
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
}
