import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8AB4F8',
      contrastText: '#202124',
    },
    secondary: {
      main: '#35363A',
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
      default: '#202124',
      paper: '#292A2D',
      main: '#202124',
      muted: 'rgba(53, 54, 58, 0.6)',
    },
    border: {
      soft: 'rgba(60, 64, 67, 0.6)',
      main: '#3C4043',
    },
    divider: '#3C4043',
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    main: '"DM Sans", system-ui, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});
