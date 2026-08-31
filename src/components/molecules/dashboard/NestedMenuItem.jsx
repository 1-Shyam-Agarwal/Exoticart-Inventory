import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import { NestedMenuItemChild } from './NestedMenuItemChild';

const ExpandIcon = styled(KeyboardArrowRightIcon)(({ theme, isOpen }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  flexShrink: 0,
}));

// Grace period so moving the cursor across the gap between the rail and the
// flyout does not dismiss it. Keep this comfortably above the time it takes to
// cross the Paper's left margin below, or the panel closes mid-traverse.
const FLYOUT_CLOSE_DELAY = 180;

export function NestedMenuItem({ item, collapsed = false, onNavigate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimer = useRef(null);

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  const to = item.path ? `/org/active/${id}/${item.path}` : undefined;
  const isSelected = to ? location.pathname === to : false;
  const isParentSelected =
    hasSubmenu &&
    item.submenu.some((child) => location.pathname === `/org/active/${id}/${child.path}`);

  // Toggling the rail should never leave an orphaned flyout anchored to a node
  // whose width just changed. Adjusting during render avoids the extra pass an
  // effect would cost. See https://react.dev/learn/you-might-not-need-an-effect
  const [prevCollapsed, setPrevCollapsed] = useState(collapsed);
  if (prevCollapsed !== collapsed) {
    setPrevCollapsed(collapsed);
    setAnchorEl(null);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openFlyout = (event) => {
    clearTimeout(closeTimer.current);
    setAnchorEl(event.currentTarget);
  };

  const closeFlyout = () => {
    closeTimer.current = setTimeout(() => setAnchorEl(null), FLYOUT_CLOSE_DELAY);
  };

  const cancelClose = () => clearTimeout(closeTimer.current);

  const handleClick = () => {
    if (hasSubmenu) {
      if (!collapsed) setIsOpen((prev) => !prev);
      return;
    }
    if (to) {
      navigate(to);
      onNavigate?.();
    }
  };

  const button = (
    <ListItemButton
      selected={isSelected || isParentSelected}
      onClick={handleClick}
      sx={{
        pl: 1,
        minHeight: collapsed ? 48 : 40,
        py: collapsed ? 1.75 : 1,
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
    >
      {item.icon && (
        <ListItemIcon sx={{ minWidth: collapsed ? 0 : undefined }}>{item.icon}</ListItemIcon>
      )}
      {!collapsed && <ListItemText primary={item.text} />}
      {!collapsed && hasSubmenu && <ExpandIcon isOpen={isOpen} />}
    </ListItemButton>
  );

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: 'block' }}
        onMouseEnter={collapsed && hasSubmenu ? openFlyout : undefined}
        onMouseLeave={collapsed && hasSubmenu ? closeFlyout : undefined}
      >
        {collapsed && !hasSubmenu ? (
          <Tooltip title={item.text} placement="right">
            {button}
          </Tooltip>
        ) : (
          button
        )}
      </ListItem>

      {/* Expanded: submenu opens inline underneath the parent. */}
      {hasSubmenu && !collapsed && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" dense disablePadding sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
            {item.submenu.map((child) => (
              <NestedMenuItemChild key={child.text} item={child} level={1} onNavigate={onNavigate} />
            ))}
          </List>
        </Collapse>
      )}

      {/* Collapsed: submenu flies out to the right of the rail. */}
      {hasSubmenu && collapsed && (
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="right-start"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Paper
            elevation={8}
            onMouseEnter={cancelClose}
            onMouseLeave={closeFlyout}
            sx={{ ml: 1.5, minWidth: 180, py: 0.5, overflow: 'hidden' }}
          >
            <Typography
              variant="caption"
              sx={{ display: 'block', px: 2, py: 0.5, color: 'text.secondary', fontWeight: 600 }}
            >
              {item.text}
            </Typography>
            <List component="div" dense disablePadding>
              {item.submenu.map((child) => (
                <NestedMenuItemChild
                  key={child.text}
                  item={child}
                  inFlyout
                  onNavigate={() => {
                    setAnchorEl(null);
                    onNavigate?.();
                  }}
                />
              ))}
            </List>
          </Paper>
        </Popper>
      )}
    </>
  );
}
