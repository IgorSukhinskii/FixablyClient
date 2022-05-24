import React from 'react'
import { CircularProgress } from '@mui/material'

import { getStatuses, search } from 'api/methods'
import { useApiAndCall } from 'api/hooks'
import { ApiFunction } from 'api/types'

import PieChart, { PieChartDatum } from 'components/pie-chart'

const countAllStatuses: ApiFunction<void, PieChartDatum[]> = async (axios) => {
  const statuses = await getStatuses(axios)
  return Promise.all(
    statuses.map(({ description }) =>
      search(axios, { type: 'statuses', criteria: description }).then(
        ({ total }) => ({ id: description, value: total })
      )
    )
  )
}

const Statistics = () => {
  const { data } = useApiAndCall(countAllStatuses)

  if (data == null) {
    return <CircularProgress />
  }

  return <PieChart data={data} />
}

export default Statistics
