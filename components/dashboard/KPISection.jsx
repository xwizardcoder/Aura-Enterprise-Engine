'use client'

import {
  Package,
  DollarSign,
  AlertTriangle,
} from 'lucide-react'

export default function KPICards({
  data,
}) {
  const totalSKUs = data.length

  const totalInventoryValue = data.reduce(
    (acc, item) =>
      acc + item.price * item.stock,
    0
  )

  const outOfStockItems = data.filter(
    (item) => item.stock === 0
  ).length

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(num)
  }

  const cards = [
    {
      title: 'Total SKUs',
      value: formatNumber(totalSKUs),
      icon: Package,
      description: 'Active inventory products',
      border: 'border-blue-500/20',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
    },

    {
      title: 'Inventory Value',
      value: formatCurrency(totalInventoryValue),
      icon: DollarSign,
      description: 'Total warehouse valuation',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
    },

    {
      title: 'Out of Stock',
      value: formatNumber(outOfStockItems),
      icon: AlertTriangle,
      description: 'Products requiring restock',
      border: 'border-red-500/20',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
    },
  ]

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className={`rounded-2xl border ${card.border} bg-zinc-950/80 p-6 backdrop-blur`}
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-sm text-zinc-400'>
                  {card.title}
                </p>

                <h2 className='mt-3 text-3xl font-bold text-white'>
                  {card.value}
                </h2>

                <p className='mt-2 text-sm text-zinc-500'>
                  {card.description}
                </p>
              </div>

              <div className={`rounded-2xl ${card.bg} p-4`}>
                <Icon className={card.text} size={28} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}