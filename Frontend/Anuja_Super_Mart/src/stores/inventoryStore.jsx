import { create } from 'zustand';

const useInventoryStore = create((set) => ({
  inventory: [],
  error: null,
  setError: (error) => set({ error }),
  setInventory: (newInventory) => set({ inventory: newInventory }),
  addInventory: (newItem) => set((state) => ({ inventory: [...state.inventory, newItem] })),
  removeInventory: (id) => set((state) => ({ inventory: state.inventory.filter(item => item._id !== id) })),
  updateInventory: (updatedItem) => set((state) => ({
    inventory: state.inventory.map(item => (item._id === updatedItem._id ? updatedItem : item))
  })),
  // New synchronous actions
  filterInventoryByName: (itemName) => {
    const filteredInventory = state.inventory.filter(item => item.productName === itemName);
    set({ inventory: filteredInventory });
  },
  filterInventoryByProductId: (productId) => {
    const filteredInventory = state.inventory.filter(item => item.productId === productId);
    set({ inventory: filteredInventory });
  },
  filterInventoryByCategory: (categoryName) => {
    const filteredInventory = state.inventory.filter(item => item.category === categoryName);
    set({ inventory: filteredInventory });
  }
}));

export default useInventoryStore;
