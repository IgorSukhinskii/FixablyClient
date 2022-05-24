import React from 'react'

import { Stack, CssBaseline, Container } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import themeOptions from 'themes/defaultTheme'
import Router from 'components/router'
import AppBar from 'components/app-bar'
import { AxiosInstanceProvider } from 'api/context'

const theme = createTheme(themeOptions)

function App() {
  return (
    <AxiosInstanceProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Container maxWidth="sm">
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%' }}
          >
            <Router />
          </Stack>
        </Container>
      </ThemeProvider>
    </AxiosInstanceProvider>
  )
}

export default App
