import { inventory } from '@/data/mockInventory'

import KPISection from '@/components/dashboard/KPISection'
import RestockChart from '@/components/dashboard/RestockChart'
import InventoryPieChart from '@/components/dashboard/InventoryPieChart'

import DataTable from '@/components/table/DataTable'
import Filters from '@/components/table/Filters'
import Omnisearch from '@/components/table/Omnisearch'

export default function DashboardPage() {
  return (
    <main className='min-h-screen bg-black text-white'>
      <div className='mx-auto max-w-7xl space-y-8 p-6'>
        <div>
          <h1 className='text-4xl font-bold'>
            Enterprise Command Center
          </h1>

          <p className='mt-2 text-zinc-400'>
            Real-time inventory intelligence dashboard
          </p>
        </div>

        <KPISection data={inventory} />

        <div className='grid gap-6 lg:grid-cols-2'>
          <RestockChart data={inventory} />

          <InventoryPieChart data={inventory} />
        </div>

        <div className='space-y-4'>
          <Omnisearch />

          <Filters />

          <DataTable />
        </div>
      </div>
    </main>
  )
}