import React from 'react'

import DataTablePaginated from 'components/data-table-paginated'
import { GridColDef } from '@mui/x-data-grid'

import { getOrders } from 'api/methods'
import { Box } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'deviceBrand', headerName: 'Brand', width: 130 },
  { field: 'deviceManufacturer', headerName: 'Manufacturer', width: 130 },
  { field: 'deviceType', headerName: 'Type', width: 80 },
  { field: 'technician', headerName: 'Technician', width: 130 },
]

export default function OrdersTable() {
  return <DataTablePaginated columns={columns} apiFunction={getOrders} />
}
