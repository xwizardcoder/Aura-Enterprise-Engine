const categories = [
  'Electronics',
  'Apparel',
  'Furniture',
  'Accessories',
]

export const inventory = Array.from({ length: 50000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: categories[Math.floor(Math.random() * categories.length)],
  price: Number((Math.random() * 1000).toFixed(2)),
  stock: Math.floor(Math.random() * 100),
  sku: `SKU-${1000 + i}`,
}))