'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function RestockChart({
  data,
}) {
  const chartData = [...data]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10)
    .map((item) => ({
      name:
        item.name.length > 15
          ? item.name.slice(0, 15) + '...'
          : item.name,

      stock: item.stock,
    }))

  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold text-white'>
            Restock Priority
          </h2>

          <p className='mt-1 text-sm text-zinc-400'>
            Top 10 lowest stock products
          </p>
        </div>

        <div className='rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400'>
          Risk Assessment
        </div>
      </div>

      <div className='h-[420px] w-full'>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 60,
            }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#27272a'
            />

            <XAxis
              dataKey='name'
              interval={0}
              angle={-25}
              textAnchor='end'
              tick={{
                fill: '#a1a1aa',
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fill: '#a1a1aa',
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: 'rgba(255,255,255,0.04)',
              }}
              contentStyle={{
                backgroundColor: '#18181b',
                border:
                  '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                color: '#fff',
              }}
            />

            <Bar
              dataKey='stock'
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}