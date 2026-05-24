'use client'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from 'recharts'

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
]

export default function InventoryPieChart({
  data,
}) {
  const groupedData = data.reduce(
    (acc, item) => {
      const inventoryValue =
        item.price * item.stock

      acc[item.category] =
        (acc[item.category] || 0) +
        inventoryValue

      return acc
    },
    {}
  )

  const chartData = Object.entries(
    groupedData
  ).map(([name, value]) => ({
    name,
    value,
  }))

  const totalValue = chartData.reduce(
    (acc, item) => acc + item.value,
    0
  )

  const formattedData = chartData.map(
    (item) => ({
      ...item,
      percentage: (
        (item.value / totalValue) *
        100
      ).toFixed(1),
    })
  )

  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold text-white'>
            Portfolio Distribution
          </h2>

          <p className='mt-1 text-sm text-zinc-400'>
            Inventory valuation by category
          </p>
        </div>

        <div className='rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400'>
          Analytics
        </div>
      </div>

      <div className='h-[420px] w-full'>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <PieChart>
            <Pie
              data={formattedData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={140}
              innerRadius={70}
              paddingAngle={4}
              label={({ name, percentage }) =>
                `${name}: ${percentage}%`
              }
            >
              {formattedData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                'Inventory Value',
              ]}
              contentStyle={{
                backgroundColor: '#18181b',
                border:
                  '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                color: '#fff',
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}