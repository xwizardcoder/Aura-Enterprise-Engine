'use client'

import { useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

import { useInventoryStore } from '@/store/inventoryStore'

import { useDebounce } from '@/hooks/useDebounce'

import ExportButton from './ExportButton'

import Pagination from './Pagination'

export default function DataTable() {
  const parentRef = useRef(null)

  const {
    page,
    search,
    category,
    stock,
    minPrice,
    maxPrice,
    sort,
    setSort,
  } = useInventoryStore()

  const debouncedSearch =
    useDebounce(search, 500)

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'inventory',
      page,
      debouncedSearch,
      category,
      stock,
      minPrice,
      maxPrice,
      sort,
    ],

    queryFn: async () => {
      const res = await api.get('/inventory', {
        params: {
          page,
          limit: 50,
          search: debouncedSearch,
          category,
          stock,
          minPrice,
          maxPrice,
          sort,
        },
      })

      return res.data
    },

    keepPreviousData: true,
  })

  const rows = data?.data || []

  const rowVirtualizer = useVirtualizer({
    count: rows.length,

    getScrollElement: () => parentRef.current,

    estimateSize: () => 72,

    overscan: 5,
  })

  if (isLoading) {
    return (
      <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center'>
        Loading inventory...
      </div>
    )
  }

  if (error) {
    return (
      <div className='rounded-2xl border border-red-500 bg-red-500/10 p-10 text-center text-red-400'>
        Failed to load inventory.
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950'>
      <div className='flex flex-col gap-4 border-b border-zinc-800 p-4 md:flex-row md:items-center md:justify-between'>
        <h2 className='text-xl font-semibold'>
          Enterprise Inventory Grid
        </h2>

        <ExportButton data={rows} />
      </div>

      <div
        ref={parentRef}
        className='relative h-[600px] overflow-auto'
      >
        <div className='sticky top-0 z-20 grid grid-cols-5 border-b border-zinc-800 bg-zinc-900 px-4 py-4 text-sm font-semibold text-zinc-300 backdrop-blur'>
          <div>Product</div>

          <button
            onClick={() =>
              setSort(
                sort === 'category-desc'
                  ? 'category-asc'
                  : 'category-desc'
              )
            }
            className='text-left'
          >
            Category{' '}
            {sort === 'category-desc'
              ? '↓'
              : '↑'}
          </button>

          <button
            onClick={() =>
              setSort(
                sort === 'price-desc'
                  ? 'price-asc'
                  : 'price-desc'
              )
            }
            className='text-left'
          >
            Price{' '}
            {sort === 'price-desc'
              ? '↓'
              : '↑'}
          </button>

          <button
            onClick={() =>
              setSort(
                sort === 'stock-desc'
                  ? 'stock-asc'
                  : 'stock-desc'
              )
            }
            className='text-left'
          >
            Stock{' '}
            {sort === 'stock-desc'
              ? '↓'
              : '↑'}
          </button>

          <div>SKU</div>
        </div>

        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer
            .getVirtualItems()
            .map((virtualRow) => {
              const item =
                rows[virtualRow.index]

              return (
                <div
                  key={item.id}
                  className='absolute left-0 top-0 grid w-full grid-cols-5 items-center border-b border-zinc-800 bg-zinc-950 px-4 transition hover:bg-zinc-900'
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className='truncate pr-4'>
                    {item.name}
                  </div>

                  <div>
                    <span className='rounded-full bg-zinc-800 px-3 py-1 text-xs'>
                      {item.category}
                    </span>
                  </div>

                  <div className='font-medium text-green-400'>
                    ${item.price}
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.stock < 20
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {item.stock} units
                    </span>
                  </div>

                  <div className='truncate text-zinc-400'>
                    {item.sku}
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <Pagination
        currentPage={data.pagination.page}
        totalPages={
          data.pagination.totalPages
        }
      />
    </div>
  )
}