import Typography from '@mui/material/Typography';

export function ProductFormSectionHeader({ title }) {
  return (
    <Typography sx={{
      fontSize: '0.95rem',
      fontWeight: 400,
      color: 'text.primary',
      mb: 2.5,
    }}>
        {title}
    </Typography>
  );
}
