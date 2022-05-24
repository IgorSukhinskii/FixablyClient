import React from 'react'

import { Bar } from '@nivo/bar'

const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 60, right: 110, bottom: 60, left: 80 },
  padding: 0.2,
  labelTextColor: 'inherit:darker(1.4)',
  labelSkipWidth: 16,
  labelSkipHeight: 16,
}

export type BarChartProps = {
  data: any
  indexBy: any
  keys: any
}
const BarChart = (props: BarChartProps) => {
  return <Bar {...props} {...commonProps} groupMode="grouped" />
}
export default BarChart
