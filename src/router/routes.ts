import OrdersTable from 'components/orders-table'
import Statistics from 'components/statistics'
import FullData from 'components/full-data'

const routes = [
  { path: '/orders', name: 'All Orders', component: OrdersTable },
  { path: '/stats', name: 'Statistics', component: Statistics },
  { path: '/full-data', name: 'Full Data', component: FullData },
]

export default routes
