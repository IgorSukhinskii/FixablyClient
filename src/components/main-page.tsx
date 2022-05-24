import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'

import { getWeek } from 'date-fns'

import { getReport } from 'api/methods'
import { useApi } from 'api/hooks'
import { unPaginate, pipe } from 'api/utils'
import { Invoice } from 'api/types'

import BarChart from 'components/bar-chart'

const transformInvoiceData = (invoices: Invoice[]) => {
  const result: Record<
    string,
    { totalAmount: number; totalCount: number; week: number }
  > = {}

  invoices.forEach((invoice) => {
    const week = getWeek(new Date(invoice.created))
    const key = week.toString()
    if (result[key]) {
      result[key].totalAmount += invoice.amount
      result[key].totalCount += 1
    } else {
      result[key] = { totalAmount: invoice.amount, totalCount: 1, week }
    }
  })

  return result
}

const MainPage = () => {
  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)
  const { call, data, loaded } = useApi(
    pipe(unPaginate(getReport, setTotal, setCurrent), transformInvoiceData)
  )
  useEffect(() => {
    call({
      fromDate: new Date('2020-11-01'),
      toDate: new Date('2020-11-30'),
    })
  }, [])
  console.log(data)
  return (
    <>
      {!loaded && (
        <CircularProgress
          variant="determinate"
          value={(current / total) * 100}
        />
      )}
      {loaded && data && (
        <BarChart
          data={Object.values(data)}
          indexBy="week"
          keys={['totalAmount', 'totalCount']}
        />
      )}
    </>
  )
}

export default MainPage
