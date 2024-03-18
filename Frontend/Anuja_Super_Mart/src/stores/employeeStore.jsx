// employeeStore.js
import { create } from 'zustand';
import axios from 'axios';

const useEmployeeStore = create((set) => ({
  employees: [],
  error: null,
  setError: (error) => set({ error }),
  setEmployees: (newEmployees) => set({ employees: newEmployees }),
  fetchEmployees: async () => {
    try {
      const response = await axios.get('/api/employees');
      set({ employees: response.data });
    } catch (error) {
      console.error('Error fetching employees:', error);
      set({ error: error.message });
    }
  },
}));

export default useEmployeeStore;
