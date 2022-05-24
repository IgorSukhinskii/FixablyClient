import { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

export const fetchToken = (axiosInstance: AxiosInstance): Promise<void> => {
  if (axiosInstance.defaults.headers.common['X-Fixably-Token'] != null) {
    return Promise.resolve()
  } else {
    const Code = Number(process.env.REACT_APP_CODE)
    return axiosInstance
      .post(
        'token',
        { Code },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        axiosInstance.defaults.headers.common['X-Fixably-Token'] =
          response.data.token
      })
  }
}

export const request = <
  ResponseData = any,
  RequestData = any,
  RequestParams = any
>(
  axiosInstance: AxiosInstance,
  method: string,
  url: string,
  data?: RequestData,
  params?: RequestParams,
  config?: AxiosRequestConfig<RequestData>
): Promise<ResponseData> => {
  return fetchToken(axiosInstance)
    .then(() =>
      axiosInstance.request<
        ResponseData,
        AxiosResponse<ResponseData, RequestData>,
        RequestData
      >({
        method,
        url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
        params,
        ...config,
      })
    )
    .then((response) => response.data)
}

export default request
