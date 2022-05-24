import React, { useEffect } from 'react'
import { Button, CircularProgress } from '@mui/material'

import { getOrders } from 'api/methods'
import { useAutoPaginatedApi } from 'api/hooks'
import { Device } from 'api/types'

const MainPage = () => {
  const { data, loaded, next, page, total } = useAutoPaginatedApi(getOrders)
  // const device: Device = {
  //   DeviceManufacturer: 'string',
  //   DeviceBrand: 'string',
  //   DeviceType: 'Phone',
  // }
  // const props = { orderId: 9243 }
  const props = { page: 308 }

  console.log(data)
  console.log(page, total, loaded)

  return loaded ? (
    <Button variant="contained" onClick={next}>
      Click Me!
    </Button>
  ) : (
    <CircularProgress />
  )
}

export default MainPage
