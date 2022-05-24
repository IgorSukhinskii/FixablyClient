import OrdersTable from 'components/orders-table'
import Statistics from 'components/statistics'
import FullData from 'components/full-data'
import MainPage from 'components/main-page'

const routes = [
  { path: '/orders', name: 'All Orders', component: OrdersTable },
  { path: '/stats', name: 'Statistics', component: Statistics },
  { path: '/full-data', name: 'Full Data', component: FullData },
  { path: '/', name: 'Main Page', component: MainPage },
]

export default routes
