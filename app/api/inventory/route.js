import { NextResponse } from 'next/server'

import { inventory } from '@/data/mockInventory'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const page =
      Number(searchParams.get('page')) || 1

    const limit =
      Number(searchParams.get('limit')) || 50

    const search =
      searchParams
        .get('search')
        ?.toLowerCase() || ''

    const category =
      searchParams.get('category') || ''

    const stock =
      Number(searchParams.get('stock')) || 100

    const minPrice =
      Number(searchParams.get('minPrice')) || 0

    const maxPrice =
      Number(searchParams.get('maxPrice')) ||
      10000

    const sort =
      searchParams.get('sort') || ''

    let filtered = inventory.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search) ||
        item.sku
          .toLowerCase()
          .includes(search) ||
        item.category
          .toLowerCase()
          .includes(search)

      const matchesCategory = category
        ? item.category === category
        : true

      const matchesStock =
        item.stock <= stock

      const matchesPrice =
        item.price >= minPrice &&
        item.price <= maxPrice

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesPrice
      )
    })

    if (sort === 'price-desc') {
      filtered.sort(
        (a, b) => b.price - a.price
      )
    }

    if (sort === 'price-asc') {
      filtered.sort(
        (a, b) => a.price - b.price
      )
    }

    if (sort === 'stock-desc') {
      filtered.sort(
        (a, b) => b.stock - a.stock
      )
    }

    if (sort === 'stock-asc') {
      filtered.sort(
        (a, b) => a.stock - b.stock
      )
    }

    if (sort === 'category-asc') {
      filtered.sort((a, b) =>
        a.category.localeCompare(
          b.category
        )
      )
    }

    if (sort === 'category-desc') {
      filtered.sort((a, b) =>
        b.category.localeCompare(
          a.category
        )
      )
    }

    const total = filtered.length

    const totalPages = Math.ceil(
      total / limit
    )

    const safePage =
      page > totalPages ? 1 : page

    const start = (safePage - 1) * limit

    const end = start + limit

    const paginatedData = filtered.slice(
      start,
      end
    )

    return NextResponse.json({
      success: true,

      data: paginatedData,

      pagination: {
        total,
        page: safePage,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Failed to fetch inventory data',
      },
      {
        status: 500,
      }
    )
  }
}