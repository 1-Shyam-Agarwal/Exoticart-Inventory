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
    MuiChartsAxis: {
      styleOverrides: {
        root: {
          '& .MuiChartsAxis-line': { stroke: '#303335' },
          '& .MuiChartsAxis-tick': { stroke: '#303335' },
          '& .MuiChartsAxis-tickLabel': { fill: '#9AA0A6', fontWeight: 500 },
        },
      },
    },
    MuiChartsGrid: {
      styleOverrides: {
        root: {
          '& .MuiChartsGrid-line': {
            stroke: '#303335',
            strokeDasharray: '4 2',
            strokeWidth: 0.8,
          },
        },
      },
    },
    MuiChartsTooltip: {
      styleOverrides: {
        table: {
          border: '1px solid #303335',
          borderRadius: 8,
          background: '#1E1F21',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(48, 51, 53, 0.6)',
          backgroundColor: '#17181A',
        },
        columnHeader: {
          backgroundColor: '#1E1F21',
        },
        footerContainer: {
          backgroundColor: '#1E1F21',
        },
        cell: {
          borderTopColor: 'rgba(48, 51, 53, 0.6)',
        },
        row: {
          '&:hover': {
            backgroundColor: 'rgba(42, 43, 46, 0.6)',
          },
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        content: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(42, 43, 46, 0.6)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(42, 43, 46, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(42, 43, 46, 0.9)',
            },
          },
        },
      },
    },
    MuiPickerPopper: {
      styleOverrides: {
        paper: {
          border: '1px solid rgba(48, 51, 53, 0.6)',
          backgroundImage: 'none',
          backgroundColor: '#1E1F21',
        },
      },
    },
  },
});
