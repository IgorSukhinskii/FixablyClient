import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { useApiAndCall } from 'api/hooks'
import { unPaginate } from 'api/utils'
import { getOrders } from 'api/methods'

import DataTable from 'components/data-table'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'deviceBrand', headerName: 'Brand', width: 130 },
  { field: 'deviceManufacturer', headerName: 'Manufacturer', width: 130 },
  { field: 'deviceType', headerName: 'Type', width: 80 },
  { field: 'technician', headerName: 'Technician', width: 130 },
]

const FullData = () => {
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)
  // const { data } = useApiAndCall(countAllStatuses)
  const { data, loaded } = useApiAndCall(
    unPaginate(getOrders, setTotal, setCurrent)
  )

  return (
    <>
      {!loaded && (
        <CircularProgress
          variant="determinate"
          value={(current / total) * 100}
        />
      )}
      {loaded && data && <DataTable columns={columns} data={data} />}
    </>
  )
}

export default FullData
