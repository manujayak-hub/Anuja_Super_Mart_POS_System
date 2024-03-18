import { create } from 'zustand';


const useTransactionStore = create((set) => ({
  transactions: [],
  error: null,
  setError: (error) => set({ error }),
  setTransactions: (newTransactions) => set({ transactions: newTransactions }),
  addTransaction: (newTransaction) => set((state) => ({ transactions: [...state.transactions, newTransaction] })),
  removeTransaction: (id) => set((state) => ({ transactions: state.transactions.filter(transaction => transaction._id !== id) })),
  updateTransaction: (updatedTransaction) => set((state) => ({
    transactions: state.transactions.map(transaction => (transaction._id === updatedTransaction._id ? updatedTransaction : transaction))
  })),
  
}));

export default useTransactionStore;
