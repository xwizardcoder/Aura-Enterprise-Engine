'use client'

import { Download } from 'lucide-react'

import { exportCSV } from '@/lib/csv'

export default function ExportButton({ data }) {
  return (
    <button
      onClick={() => exportCSV(data)}
      className='flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500'
    >
      <Download size={18} />

      Export CSV
    </button>
  )
}