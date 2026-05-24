'use client'

import { useInventoryStore } from '@/store/inventoryStore'

export default function Pagination({
  currentPage,
  totalPages,
}) {
  const { setPage } = useInventoryStore()

  const getPages = () => {
    const pages = []

    const start = Math.max(currentPage - 2, 1)

    const end = Math.min(currentPage + 2, totalPages)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const pages = getPages()

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 border-t border-zinc-800 p-4'>
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className='rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Previous
      </button>

      {currentPage > 3 && (
        <button
          onClick={() => setPage(1)}
          className='rounded-lg bg-zinc-800 px-3 py-2 text-sm'
        >
          1
        </button>
      )}

      {currentPage > 4 && (
        <span className='px-2 text-zinc-500'>
          ...
        </span>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`rounded-lg px-4 py-2 text-sm transition ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 hover:bg-zinc-700'
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 3 && (
        <span className='px-2 text-zinc-500'>
          ...
        </span>
      )}

      {currentPage < totalPages - 2 && (
        <button
          onClick={() => setPage(totalPages)}
          className='rounded-lg bg-zinc-800 px-3 py-2 text-sm'
        >
          {totalPages}
        </button>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
        className='rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Next
      </button>
    </div>
  )
}