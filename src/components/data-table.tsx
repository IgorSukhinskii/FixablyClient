import React from 'react'

import { Pagination } from '@mui/material'
import {
  DataGrid,
  GridColumns,
  gridPageCountSelector,
  gridPageSelector,
  GridValidRowModel,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'

import { useAutoPaginatedApi } from 'api/hooks'
import { ApiFunction, Paginated, PaginatedResponse } from 'api/types'

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
  apiFunction: ApiFunction<Paginated, PaginatedResponse<R>>
}
export default function DataTable<R>({
  columns,
  apiFunction,
}: DataTableProps<R>) {
  const { data, page, setPage, pageSize, total, loaded } =
    useAutoPaginatedApi(apiFunction)

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          paginationMode="server"
          page={page - 1}
          onPageChange={(newPage) => setPage(newPage + 1)}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          rowCount={total}
          loading={!loaded}
          autoHeight
          components={{
            Pagination: CustomPagination,
          }}
          {...data}
        />
      </div>
    </div>
  )
}
