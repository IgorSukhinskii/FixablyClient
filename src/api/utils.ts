import { ApiFunction, Paginated, PaginatedResponse } from './types'

const range = (size: number, startAt: number = 0) => {
  return Array.from({ length: size }, (_, i) => i + startAt)
}

export const unPaginate = <CallProps, ResponseData>(
  apiFunction: ApiFunction<
    Paginated<CallProps>,
    PaginatedResponse<ResponseData>
  >,
  setTotal: (total: number) => void,
  setCurrent: (current: number) => void
): ApiFunction<CallProps, ResponseData[]> => {
  return async (axios, callProps) => {
    // let's see how many pages there are
    const res = await apiFunction(axios, callProps)
    const pagesLeft = Math.floor((res.total - 1) / res.results.length)
    let current = 0
    setTotal(pagesLeft)
    setCurrent(current)
    const pages = await Promise.all(
      range(pagesLeft, 2).map((page) =>
        apiFunction(axios, { page, ...callProps }).then(({ results }) => {
          current += 1
          setCurrent(current)
          return results
        })
      )
    )
    return res.results.concat(...pages)
  }
}
