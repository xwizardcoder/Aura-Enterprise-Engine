import { create } from 'zustand'

export const useInventoryStore = create((set) => ({
  page: 1,
  search: '',
  category: '',
  stock: 100,
  minPrice: 0,
  maxPrice: 1000,
  sort: '',

  setPage: (page) => set({ page }),

  setSearch: (search) => set({ search }),

  setCategory: (category) => set({ category }),

  setStock: (stock) => set({ stock }),

  setPrice: (minPrice, maxPrice) =>
    set({
      minPrice,
      maxPrice,
    }),

  setSort: (sort) => set({ sort }),
}))