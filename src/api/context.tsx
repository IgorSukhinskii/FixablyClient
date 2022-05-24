import { useRef, useContext, createContext } from 'react'
import axios, { AxiosInstance } from 'axios'

export const AxiosContext = createContext<AxiosInstance | null>(null)
export const AxiosInstanceProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const instanceRef = useRef(axios.create())

  instanceRef.current.defaults.baseURL = process.env.REACT_APP_BASE_URL

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  )
}

export const useAxios = () => useContext(AxiosContext)
