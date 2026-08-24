import Typography from '@mui/material/Typography';

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[{ color: 'text.secondary' }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
    >
      {'Copyright © '}Exoticart Inventory {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
