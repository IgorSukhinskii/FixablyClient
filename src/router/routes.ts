import OrdersTable from 'components/orders-table'
import Statistics from 'components/statistics'

const routes = [
  { path: '/orders', name: 'All Orders', component: OrdersTable },
  { path: '/stats', name: 'Statistics', component: Statistics },
]

export default routes
