import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5f6368',
    },
    background: {
      main: '#f8f9fa',
      muted: 'rgba(236, 239, 241, 0.6)',
    },
    border: {
      soft: 'rgba(207, 216, 220, 0.6)',
      main: 'rgba(207, 216, 220, 1)',
    },
    mode: 'light',
  },
  typography: {
    main: '"DM Sans", system-ui, sans-serif',
  },
});
