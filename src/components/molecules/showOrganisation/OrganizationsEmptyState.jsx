import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function OrganizationsEmptyState({ icon: Icon, title, description, onCreate }) {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
      }}
    >
      <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
        {Icon ? <Icon sx={{ fontSize: 64, color: 'text.secondary' }} /> : null}

        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1.125rem', color: 'text.primary' }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', maxWidth: 340, fontSize: '0.875rem', lineHeight: 1.5 }}
          >
            {description}
          </Typography>
        </Stack>

        <Button
          type="button"
          variant="contained"
          onClick={onCreate}
          sx={{ textTransform: 'none', mt: 1, height: 40, width: 192, borderRadius: 999, fontWeight: 500 }}
        >
          Create Organization
        </Button>
      </Stack>
    </Box>
  );
}
