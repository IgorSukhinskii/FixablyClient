import * as React from 'react'

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
} from '@mui/material'

import routes from 'router/routes'

const MainAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fixably API
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {routes.map((route) => (
              <Button color="secondary" href={route.path} key={route.path}>
                {route.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default MainAppBar
