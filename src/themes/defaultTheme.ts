import { ThemeOptions } from '@mui/material'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#d500f9',
    },
    secondary: {
      main: '#f50057',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'default',
      },
    },
    MuiButton: {
      styleOverrides:{
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
  },
};

export default themeOptions;