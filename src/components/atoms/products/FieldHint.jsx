import Typography from '@mui/material/Typography';

export function FieldHint({ children }) {
  return (
    <Typography sx={{ mt: 0.5, fontSize: '0.75rem', color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}
