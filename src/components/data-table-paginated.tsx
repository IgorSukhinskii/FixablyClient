import React from 'react'

import { GridColumns, GridValidRowModel } from '@mui/x-data-grid'

import { useAutoPaginatedApi } from 'api/hooks'
import { ApiFunction, Paginated, PaginatedResponse } from 'api/types'

import DataTable from 'components/data-table'

interface DataTablePaginatedProps<R extends GridValidRowModel> {
  columns: GridColumns<R>
  apiFunction: ApiFunction<Paginated, PaginatedResponse<R>>
}
export default function DataTablePaginated<R>({
  columns,
  apiFunction,
}: DataTablePaginatedProps<R>) {
  const { data, page, setPage, pageSize, total, loaded } =
    useAutoPaginatedApi(apiFunction)

  return (
    <DataTable<R>
      data={data}
      columns={columns}
      paginationMode="server"
      page={page - 1}
      onPageChange={(newPage) => setPage(newPage + 1)}
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
      rowCount={total}
      loading={!loaded}
    />
  )
}
