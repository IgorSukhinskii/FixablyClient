import React from 'react'

import { Pagination } from '@mui/material'
import {
  DataGrid,
  GridCallbackDetails,
  GridColumns,
  GridFeatureMode,
  gridPageCountSelector,
  gridPageSelector,
  GridValidRowModel,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

interface DataTableProps<R extends GridValidRowModel> {
  columns: GridColumns<R>
  data: R[]
  page?: number
  onPageChange?: (page: number, details: GridCallbackDetails) => void
  pageSize?: number
  rowsPerPageOptions?: number[]
  rowCount?: number
  loading?: boolean
  paginationMode?: GridFeatureMode
}
export default function DataTable<R>({
  columns,
  data,
  ...rest
}: DataTableProps<R>) {
  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          autoHeight
          components={{
            Pagination: CustomPagination,
          }}
          {...rest}
        />
      </div>
    </div>
  )
}
