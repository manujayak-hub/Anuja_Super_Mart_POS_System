import { create } from 'zustand';

const useEmployeeStore = create((set) => ({
  employees: [],
  error:null,
  setEmployees: (newEmployees) => set({ employees: newEmployees }),
  addEmployee: (newEmployee) => set((state) => ({ employees: [...state.employees, newEmployee] })),
  removeEmployee: (id) => set((state) => ({ employees: state.employees.filter(employee => employee._id !== id) })),
  updateEmployee: (updatedEmployee) => set((state) => ({
    employees: state.employees.map(employee => (employee._id === updatedEmployee._id ? updatedEmployee : employee))
  })),
}));

export default useEmployeeStore;
