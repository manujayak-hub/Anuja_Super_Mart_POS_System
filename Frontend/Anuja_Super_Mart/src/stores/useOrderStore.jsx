import axios from '../api/axios';
import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orders: [],
  error: null,
  setError: (error) => set({ error }),
  setOrders: (newOrders) => set({ orders: newOrders }),
  addOrder: (newOrder) => set((state) => ({ orders: [...state.orders, newOrder] })),
  removeOrder: (id) => set((state) => ({ orders: state.orders.filter(order => order._id !== id) })),
  updateOrder: async (updatedOrder) => {
    try {
      const response = await axios.patch(`/order/${updatedOrder._id}`, updatedOrder);
      const updatedOrderFromServer = response.data;
      set((state) => ({
        orders: state.orders.map(order => (order._id === updatedOrderFromServer._id ? updatedOrderFromServer : order))
      }));
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },
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
