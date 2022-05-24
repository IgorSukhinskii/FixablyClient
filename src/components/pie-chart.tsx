import React from 'react'

import { Pie } from '@nivo/pie'

export type PieChartDatum = { id: string; value: number }
type Props = { data: PieChartDatum[] }
const PieChart = ({ data }: Props) => {
  return (
    <Pie
      data={data}
      width={500}
      height={500}
      margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
      innerRadius={0.4}
      arcLinkLabelsTextColor="#FFFFFF"
      activeOuterRadiusOffset={8}
      theme={{ tooltip: { container: { color: '#000000' } } }}
    />
  )
}

export default PieChart
