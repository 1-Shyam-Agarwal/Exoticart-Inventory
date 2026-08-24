import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8AB4F8',
      contrastText: '#202124',
    },
    secondary: {
      main: '#2A2B2E',
      contrastText: '#8AB4F8',
    },
    error: {
      main: '#FF8A65',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#9AA0A6',
    },
    background: {
      default: '#17181A',
      paper: '#1E1F21',
      main: '#17181A',
      muted: 'rgba(42, 43, 46, 0.6)',
    },
    border: {
      soft: 'rgba(48, 51, 53, 0.6)',
      main: '#303335',
    },
    divider: '#303335',
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    main: '"DM Sans", system-ui, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
        },
      },
    },
  },
});
