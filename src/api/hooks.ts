import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

import { AxiosContext } from './context';

export const useToken = (axiosInstance: AxiosInstance) => {
  const code = Number(process.env.REACT_APP_CODE);
  console.log('CODE: ', code);
  const fetchTokenIfNeeded = () => {
    const code = Number(process.env.REACT_APP_CODE);
    return new Promise<void>((resolve, reject) => {
      if (axiosInstance.defaults.headers.common['X-Fixably-Token'] != null) {
        console.log('EXISTING TOKEN: ', axiosInstance.defaults.headers.common['X-Fixably-Token']);
        resolve();
      } else {
        axiosInstance
          .post('token', {Code: code}, { headers: {
            'Content-Type': 'multipart/form-data'
          }})
          .then((response) => {
            console.log('TOKEN RESPONSE: ', response);
            axiosInstance.defaults.headers.common['X-Fixably-Token'] = response.data.token;
            resolve();
          })
          .catch(reason => reject(reason));
      }
    });
  };
  return fetchTokenIfNeeded;
};

interface UseApiReturnType {
  cancel: () => void;
  data: any;
  error: any;
  loaded: boolean;
}

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

const request = <RequestData, RequestParams, ResponseData>(
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

interface ProxyAxios {
  get: <
      RequestParams = any,
      ResponseData = any
    >(
      url: string,
      params: RequestParams
    ) => Promise<AxiosResponse<ResponseData, {}>>;
  post: <
      RequestData = any,
      RequestParams = any,
      ResponseData = any
    >(
      url: string,
      data: RequestData,
      params?: RequestParams
    ) => Promise<AxiosResponse<ResponseData, RequestData>>
}

const proxyAxios = (axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => {
  return {
    get: <
        RequestParams = any,
        ResponseData = any
      >(
        url: string,
        params: RequestParams
      ): Promise<AxiosResponse<ResponseData, {}>> =>
        request(axiosInstance, 'GET', url, {}, params, config),
    post: <
        RequestData = any,
        RequestParams = any,
        ResponseData = any
      >(
        url: string,
        data: RequestData,
        params?: RequestParams
      ): Promise<AxiosResponse<ResponseData, RequestData>> =>
        request(axiosInstance, 'POST', url, data, params, config)
  };
};

export const useApi = () => {
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const contextInstance = useContext(AxiosContext);
  const axiosInstance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);

  const { get, post } = proxyAxios(axiosInstance, { signal: controllerRef.current.signal });

  return { get, post, cancel };
};


export const useApiCall = (
    send: (config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>,
    cancel: () => void
  ): UseApiReturnType => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    send()
      .then(response => setData(response.data))
      .catch(error => setError(error))
      .finally(() => setLoaded(loaded));
  }, []);

  return { cancel, data, error, loaded };
};
