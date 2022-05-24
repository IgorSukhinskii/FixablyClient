import React from 'react'
import { Route, Switch } from 'wouter'

import routes from './routes'

export default function Router() {
  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route path={path} component={component} key={path} />
      ))}
    </Switch>
  )
}
