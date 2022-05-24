import React from 'react'
import { Route, Switch } from 'wouter'

import OrdersTable from './orders-table'

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={OrdersTable} />
      <Route />
    </Switch>
  )
}
