import { AxiosInstance } from 'axios'

export type DeviceType = 'Laptop' | 'Phone' | 'Tablet'
export interface Note {
  created: string
  description: string
  id: number
  type: string
}
export interface Order {
  created: string
  deviceBrand: string
  deviceManufacturer: string
  deviceType: DeviceType
  id: number
  status: number | {}
  invoices?: any[]
  notes?: Note[]
  technician?: string
}

export type Paginated<T = {}> = T & { page?: number }
export interface PaginatedResponse<T> {
  page: number
  total: number
  results: T[]
}

export type ApiFunction<CallProps, ResponseData> = (
  axios: AxiosInstance,
  props: CallProps
) => Promise<ResponseData>

export interface Device {
  DeviceManufacturer: string
  DeviceBrand: string
  DeviceType: DeviceType
}

export type NoteType = 'Issue' | 'Diagnosis' | 'Resolution'
export interface NoteRequest {
  Type: NoteType
  Description: string
}

export type SearchType = 'notes' | 'technicians' | 'devices' | 'statuses'

export interface UseApiReturnType<CallProps, ResponseData> {
  call: (props: CallProps) => void
  data: ResponseData | undefined
  error: any
  loaded: boolean
}

export interface Status {
  id: number
  description: string
}
