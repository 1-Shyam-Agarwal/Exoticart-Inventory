import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import developerLogo from '../../../../public/assets/developer_logo.png';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';

export const ORGANIZATION_ROW_HEIGHT = 75;

export function OrganizationListItem({ name, industry, status, logoPath, updatedAt, onClick, onDelete }) {
  const isReady = status === 'active';
  const updatedLabel = formatRelativeTime(updatedAt) ;

  return (
    <Box
      onClick={onClick}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border.main',
        px: 2,
        height: ORGANIZATION_ROW_HEIGHT,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'background.muted',
        }
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center'}}>
        <Avatar
          src={logoPath || developerLogo}
          alt={`${name} logo`}
          variant="rounded"
          sx={{
            width: 28,
            height: 28,
            bgcolor: 'background.muted',
            '& .MuiAvatar-img': { objectFit: 'contain' },
          }}
        />

        <Stack spacing={0.25}>
          <Typography variant="body2" noWrap sx={{ color: 'text.primary' }}>
            {name}
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
            {industry}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center'}}>
        <Stack spacing={0.5} sx={{ alignItems: 'flex-end' }}>
          <Chip
            label={isReady ? 'Active' : 'Draft'}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.6875rem',
              fontWeight: 500,
              bgcolor: isReady ? 'rgba(138, 180, 248, 0.16)' : 'background.muted',
              color: isReady ? 'primary.main' : 'text.secondary',
              '& .MuiChip-label': { px: 1 },
            }}
          />
          <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
            Updated {updatedLabel}
          </Typography>
        </Stack>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
              sx={{ color: 'error.main' }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        
      </Stack>
    </Box>
  );
}
