'use client'

import { useInventoryStore } from '@/store/inventoryStore'

export default function Filters() {
  const {
    category,
    setCategory,
    stock,
    setStock,
    minPrice,
    maxPrice,
    setPrice,
    setPage,
  } = useInventoryStore()

  const handleCategory = (e) => {
    setCategory(e.target.value)

    setPage(1)
  }

  const handleStock = (e) => {
    setStock(Number(e.target.value))

    setPage(1)
  }

  const handleMinPrice = (e) => {
    setPrice(Number(e.target.value), maxPrice)

    setPage(1)
  }

  const handleMaxPrice = (e) => {
    setPrice(minPrice, Number(e.target.value))

    setPage(1)
  }

  return (
    <div className='grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:grid-cols-4'>
      <select
        value={category}
        onChange={handleCategory}
        className='rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none'
      >
        <option value=''>All Categories</option>

        <option value='Electronics'>
          Electronics
        </option>

        <option value='Apparel'>
          Apparel
        </option>

        <option value='Furniture'>
          Furniture
        </option>

        <option value='Accessories'>
          Accessories
        </option>
      </select>

      <div>
        <p className='mb-2 text-sm text-zinc-400'>
          Stock Below: {stock}
        </p>

        <input
          type='range'
          min='0'
          max='100'
          value={stock}
          onChange={handleStock}
          className='w-full'
        />
      </div>

      <input
        type='number'
        placeholder='Min Price'
        value={minPrice}
        onChange={handleMinPrice}
        className='rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none'
      />

      <input
        type='number'
        placeholder='Max Price'
        value={maxPrice}
        onChange={handleMaxPrice}
        className='rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none'
      />
    </div>
  )
}