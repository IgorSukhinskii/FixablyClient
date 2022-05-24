import request from './request'
import {
  ApiFunction,
  Paginated,
  PaginatedResponse,
  Order,
  Device,
  SearchType,
  NoteRequest,
  Status,
  Invoice,
} from './types'

export const getOrders: ApiFunction<Paginated, PaginatedResponse<Order>> = (
  axios,
  params
) => request<PaginatedResponse<Order>>(axios, 'GET', 'orders', {}, params)

interface CreateOrderResult {
  id: number
  message: string
}
export const createOrder: ApiFunction<{ device: Device }, CreateOrderResult> = (
  axios,
  { device }
) => request<CreateOrderResult>(axios, 'POST', '/orders/create', device)

export const getOrder: ApiFunction<{ orderId: number }, Order> = (
  axios,
  { orderId }
) => request<Order>(axios, 'GET', `/orders/${orderId}`)

export const createNote: ApiFunction<
  { orderId: number; note: NoteRequest },
  any
> = (axios, { orderId, note }) =>
  request(axios, `/orders/${orderId}/notes/create`, 'POST', { data: note })

export const getStatuses: ApiFunction<void, Status[]> = (axios) =>
  request(axios, 'GET', '/statuses')

export const getReport: ApiFunction<
  Paginated<{ fromDate: Date; toDate: Date }>,
  PaginatedResponse<Invoice>
> = (axios, { fromDate, toDate, ...props }) => {
  const formatDate = (date: Date) => date.toISOString().substring(0, 10)
  const [from, to] = [fromDate, toDate].map(formatDate)
  return request(axios, 'POST', `/report/${from}/${to}`, {}, props)
}

export const search: ApiFunction<
  Paginated<{ type: SearchType; criteria: string }>,
  PaginatedResponse<Order>
> = (axios, { type, criteria, ...props }) =>
  request(axios, 'POST', `/search/${type}`, { Criteria: criteria }, props)
