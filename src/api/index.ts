import { useState , useMemo, useEffect} from 'react';

import mainAxios, { AxiosInstance, AxiosResponse } from 'axios';

import { request, useAxios } from './context';

type DeviceType = 'Laptop' | 'Phone' | 'Tablet';
interface Order {
  created: string;
  deviceBrand: string;
  deviceManufacturer: string;
  deviceType: DeviceType;
  id: number;
  status: number;
  technician: string;
}

type PaginatedRequest<T> = T & { page?: number };
interface PaginatedResponse<T> {
  page: number;
  total: number;
  results: T[];
};

type ApiFunction<CallProps, ResponseData, RequestData> =
  (axios: AxiosInstance, props: CallProps) => Promise<AxiosResponse<ResponseData, RequestData>>;

export const getOrders: ApiFunction<PaginatedRequest<{}>,PaginatedResponse<Order>, {}> =
  (axios, { page }) =>
    request<{}, PaginatedRequest<{}>, PaginatedResponse<Order>>(axios, 'GET', 'orders', {},  { page });

export interface Device {
  DeviceManufacturer: string;
  DeviceBrand: string;
  DeviceType: DeviceType;
}
export const createOrder: ApiFunction<{ device: Device }, any, {}> = (axios: AxiosInstance, { device }) =>
  request(axios, 'POST', '/orders/create', device);

type GetOrderProps = { orderId: number };
export const getOrder = (axios: AxiosInstance, { orderId }: GetOrderProps) =>
  request(axios, 'GET', `/orders${orderId}`);

type NoteType = 'Issue' | 'Diagnosis' | 'Resolution';
interface Note {
  Type: NoteType;
  Description: string;
}
type CreateNoteProps = { orderId: number, note: Note };
export const createNote = (axios: AxiosInstance, { orderId, note }: CreateNoteProps) =>
  request(axios, `/orders/${orderId}/notes/create`, 'POST', { data: note });

export const getStatuses = (axios: AxiosInstance) => () =>
  request(axios, 'GET', '/statuses');

type GetReportProps = { fromDate: Date, toDate: Date };
export const getReport = (axios: AxiosInstance, { fromDate, toDate, page }: PaginatedRequest<GetReportProps>) => {
  const formatDate = (date: Date) => date.toISOString().substring(0, 10);
  const [from, to] = [fromDate, toDate].map(formatDate);
  return request(axios, 'POST', `/report/${from}/${to}`, {}, { page });
};


type SearchType = 'notes' | 'technicians' | 'devices' | 'statuses';

export const search = (axios: AxiosInstance, type: SearchType, criteria: string, page = 1) =>
  request(axios, 'POST', `/search/${type}`, { Criteria: criteria }, { page });

interface UseApiReturnType<CallProps, ResponseData> {
  call: (props: CallProps) => void;
  data: ResponseData | null;
  error: any;
  loaded: boolean;
}
export const useApi = <
    CallProps,
    ResponseData,
    RequestData
  >(
    apiFunction: ApiFunction<CallProps, ResponseData, RequestData>
  ): UseApiReturnType<CallProps, ResponseData> => {
    const contextAxios = useAxios();
    const axios = useMemo(() => {
      return contextAxios || mainAxios;
    }, [contextAxios]);
    const [data, setData] = useState<ResponseData | null>(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const call = (props: CallProps) => {
      setLoaded(false);
      apiFunction(axios, props)
        .then(response => setData(response.data))
        .catch(reason => setError(reason))
        .finally(() => setLoaded(true))
    };

    return { call, data, error, loaded };
};

export const useApiAndCall = <
    ResponseData,
    RequestData
  >(
    apiFunction: ApiFunction<any, ResponseData, RequestData>
  ) => {
    const { call, ...rest } = useApi(apiFunction);
    const wrappedCall = () => call(undefined);
    useEffect(wrappedCall, []);
    return { call: wrappedCall, ...rest };
};