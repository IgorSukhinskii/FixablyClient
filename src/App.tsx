import React from 'react';
import { Switch, Route } from 'wouter';
import { Stack, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import themeOptions from './themes/defaultTheme';

import MainPage from './components/main-page';

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Switch>
          <Route path='/' component={MainPage} />
          <Route />
        </Switch>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
