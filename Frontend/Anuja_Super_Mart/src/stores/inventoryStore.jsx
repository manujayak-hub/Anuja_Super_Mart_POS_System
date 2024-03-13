import {create} from 'zustand';

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
}));

export default useInventoryStore;
