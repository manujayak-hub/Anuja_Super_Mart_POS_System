import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orders: [],
  error: null,
  setError: (error) => set({ error }),
  setOrders: (newOrders) => set({ orders: newOrders }),
  addOrder: (newOrder) => set((state) => ({ orders: [...state.orders, newOrder] })),
  removeOrder: (id) => set((state) => ({ orders: state.orders.filter(order => order._id !== id) })),
  updateOrder: (updatedOrder) => set((state) => ({
    orders: state.orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order))
  })),
  // New synchronous actions
  filterOrdersByCustomer: (customerId) => {
    const filteredOrders = state.orders.filter(order => order.customerId === customerId);
    set({ orders: filteredOrders });
  },
  filterOrdersByItem: (itemId) => {
    const filteredOrders = state.orders.filter(order => order.ItemID === itemId);
    set({ orders: filteredOrders });
  },
  filterOrdersByTotalAmount: (amount) => {
    const filteredOrders = state.orders.filter(order => order.TotalAmount === amount);
    set({ orders: filteredOrders });
  }
}));

export default useOrderStore;
