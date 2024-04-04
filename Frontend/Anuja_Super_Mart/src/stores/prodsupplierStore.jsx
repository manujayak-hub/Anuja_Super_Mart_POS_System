import {create} from 'zustand';
import axios from '../api/axios'

const useProdSupStore = create((set) => ({
  prodsupList: [],
  error: null,

  // Function to fetch all product suppliers
  fetchAllProdsup: async () => {
    try {
      const response = await axios.get('/supplier'); // Adjust the URL as per your API endpoint
      set({ prodsupList: response.data, error: null });
    } catch (error) {
      set({ error: error.response.data.error });
    }
  },

  // Function to fetch a single product supplier by ID
  fetchProdsupById: async (id) => {
    try {
      const response = await axios.get(`/api/prodsup/${id}`); // Adjust the URL as per your API endpoint
      return response.data;
    } catch (error) {
      set({ error: error.response.data.error });
    }
  },

  // Function to create a new product supplier
  createProdsup: async (newProdsupData) => {
    try {
      const response = await axios.post('/supplier', newProdsupData); // Adjust the URL as per your API endpoint
      return response.data;
    } catch (error) {
      set({ error: error.response.data.error });
    }
  },

  // Function to update an existing product supplier
  updateProdsup: async (id, updatedProdsupData) => {
    try {
      const response = await axios.put(`/api/prodsup/${id}`, updatedProdsupData); // Adjust the URL as per your API endpoint
      return response.data;
    } catch (error) {
      set({ error: error.response.data.error });
    }
  },

  // Function to delete a product supplier
  deleteProdsup: async (id) => {
    try {
      const response = await axios.delete(`/api/prodsup/${id}`); // Adjust the URL as per your API endpoint
      return response.data;
    } catch (error) {
      set({ error: error.response.data.error });
    }
  }
}));

export default useProdSupStore;
