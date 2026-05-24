export const exportCSV = (data) => {
  if (!data || data.length === 0) {
    return
  }

  const headers = [
    'ID',
    'Product Name',
    'Category',
    'Price',
    'Stock',
    'SKU',
  ]

  const rows = data.map((item) => [
    item.id,
    item.name,
    item.category,
    item.price,
    item.stock,
    item.sku,
  ])

  const csvContent = [
    headers.join(','),

    ...rows.map((row) =>
      row
        .map((value) => `"${value}"`)
        .join(',')
    ),
  ].join('\n')

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  const url =
    window.URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url

  link.setAttribute(
    'download',
    `inventory-export-${Date.now()}.csv`
  )

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  window.URL.revokeObjectURL(url)
}