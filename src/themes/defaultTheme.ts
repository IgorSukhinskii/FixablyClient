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
  },
}

export default themeOptions
