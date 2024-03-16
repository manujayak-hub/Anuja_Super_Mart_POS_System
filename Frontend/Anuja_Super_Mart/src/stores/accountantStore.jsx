import { create } from 'zustand';
import axios from 'axios';

const useTransactionStore = create((set) => ({
  transactions: [],
  error: null,
  setError: (error) => set({ error }),
  setTransactions: (newTransactions) => set({ transactions: newTransactions }),
  fetchTransactions: async () => {
    try {
      const response = await axios.get('/api/transactions');
      set({ transactions: response.data });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      set({ error: error.message });
    }
  },
}));

export default useTransactionStore;
