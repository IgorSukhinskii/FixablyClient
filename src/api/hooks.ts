import { useState, useMemo, useEffect } from 'react'

import mainAxios from 'axios'

import { useAxios } from './context'
import {
  ApiFunction,
  Paginated,
  PaginatedResponse,
  UseApiReturnType,
} from './types'

export const useApi = <CallProps, ResponseData>(
  apiFunction: ApiFunction<CallProps, ResponseData>
): UseApiReturnType<CallProps, ResponseData> => {
  const contextAxios = useAxios()
  const axios = useMemo(() => {
    return contextAxios || mainAxios
  }, [contextAxios])
  const [data, setData] = useState<ResponseData | null>(null)
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const call = (props: CallProps) => {
    setLoaded(false)
    apiFunction(axios, props)
      .then((response) => setData(response.data))
      .catch((reason) => setError(reason))
      .finally(() => setLoaded(true))
  }

  return { call, data, error, loaded }
}

export const useApiAndCall = <ResponseData>(
  apiFunction: ApiFunction<any, ResponseData>
) => {
  const { call, ...rest } = useApi(apiFunction)
  const wrappedCall = () => call(undefined)
  useEffect(wrappedCall, [])
  return { call: wrappedCall, ...rest }
}

export const usePaginatedApi = <CallProps, ResponseData>(
  apiFunction: ApiFunction<
    Paginated<CallProps>,
    PaginatedResponse<ResponseData>
  >
) => {
  const { call, data, loaded, ...rest } = useApi(apiFunction)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const pageSize = 10
  const wrappedCall = (props: CallProps) => call({ page, ...props })
  const next = () => setPage(page * pageSize < total ? page + 1 : page)
  const prev = () => setPage(page > 1 ? page - 1 : page)

  if (data != null && loaded && total != data.total) {
    setTotal(data.total)
  }

  return {
    call: wrappedCall,
    data: data?.results,
    loaded,
    page,
    setPage,
    next,
    prev,
    total,
    ...rest,
  }
}

export const useAutoPaginatedApi = <ResponseData>(
  apiFunction: ApiFunction<Paginated, PaginatedResponse<ResponseData>>
) => {
  const { call, page, ...rest } = usePaginatedApi(apiFunction)
  useEffect(() => {
    call(undefined)
    console.log('======================CALLING===================')
  }, [page])
  return { call, page, ...rest }
}
