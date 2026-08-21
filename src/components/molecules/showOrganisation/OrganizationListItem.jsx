import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import developerLogo from '../../../../public/assets/developer_logo.png';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';

export function OrganizationListItem({ name, industry, status, logoSrc, updatedAt, onClick }) {
  const isReady = status === 'ready';
  const isClickable = Boolean(onClick);
  const updatedLabel = updatedAt ? formatRelativeTime(updatedAt) : '';

  return (
    <Box
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick(event);
              }
            }
          : undefined
      }
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border.soft',
        '&:last-of-type': { borderBottom: 'none' },
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        cursor: isClickable ? 'pointer' : 'default',
        '&:hover': isClickable ? { bgcolor: 'background.muted' } : undefined,
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
        <Avatar
          src={logoSrc || developerLogo}
          alt={`${name} logo`}
          variant="rounded"
          sx={{
            width: 28,
            height: 28,
            flexShrink: 0,
            bgcolor: 'background.muted',
            '& .MuiAvatar-img': { objectFit: 'contain' },
          }}
        />

        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography variant="body2" noWrap sx={{ color: 'text.primary' }}>
            {name}
          </Typography>
          {industry ? (
            <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
              {industry}
            </Typography>
          ) : null}
        </Stack>
      </Stack>

      <Stack spacing={0.5} sx={{ alignItems: 'flex-end', flexShrink: 0 }}>
        <Chip
          label={isReady ? 'Ready' : 'Draft'}
          size="small"
          sx={{
            fontWeight: 500,
            bgcolor: isReady ? 'rgba(138, 180, 248, 0.16)' : 'background.muted',
            color: isReady ? 'primary.main' : 'text.secondary',
          }}
        />
        {updatedLabel ? (
          <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
            Updated {updatedLabel}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}
