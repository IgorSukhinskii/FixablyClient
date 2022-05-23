import React, { useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';

import { Device, getOrders, createOrder, useApi, useApiAndCall } from 'api';

const MainPage = () => {
  const { call, data, loaded } = useApi(createOrder);
  const device: Device = {
    DeviceManufacturer: 'string',
    DeviceBrand: 'string',
    DeviceType: 'Phone',
  };

  useEffect(() => call({ device }), []);
  
  console.log(data);
  console.log(loaded);

  return loaded ?
    <Button variant='contained' onClick={() => call({ device })}>Click Me!</Button> :
    <CircularProgress />;
};

export default MainPage;