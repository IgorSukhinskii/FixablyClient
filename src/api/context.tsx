import { useState, useEffect, useRef, useContext, createContext, useMemo } from 'react';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

const fetchToken = (axiosInstance: AxiosInstance): Promise<void> => {
  if (axiosInstance.defaults.headers.common['X-Fixably-Token'] != null) {
    return Promise.resolve();
  } else {
    const Code = Number(process.env.REACT_APP_CODE);
    return axiosInstance
      .post('token', { Code }, { headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        axiosInstance.defaults.headers.common['X-Fixably-Token'] = response.data.token;
      });
  }
};

export const request = <RequestData, RequestParams, ResponseData>(
  axiosInstance: AxiosInstance,
  method: string,
  url: string,
  data?: RequestData,
  params?: RequestParams,
  config?: AxiosRequestConfig<RequestData>
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  return fetchToken(axiosInstance).then(() =>
    axiosInstance.request<ResponseData, AxiosResponse<ResponseData, RequestData>, RequestData>({
      method,
      url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data,
      params,
      ...config
  }));
};

export const AxiosContext = createContext<AxiosInstance | null>(null);
export const AxiosInstanceProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const instanceRef = useRef(axios.create());

  instanceRef.current.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);
