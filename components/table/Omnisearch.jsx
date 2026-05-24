'use client'

import { Search } from 'lucide-react'

import { useInventoryStore } from '@/store/inventoryStore'

export default function Omnisearch() {
  const {
    search,
    setSearch,
    setPage,
  } = useInventoryStore()

  const handleChange = (e) => {
    setSearch(e.target.value)

    setPage(1)
  }

  return (
    <div className='relative'>
      <Search
        size={18}
        className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500'
      />

      <input
        type='text'
        value={search}
        onChange={handleChange}
        placeholder='Search products, categories, SKUs...'
        className='w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition focus:border-blue-500'
      />
    </div>
  )
}