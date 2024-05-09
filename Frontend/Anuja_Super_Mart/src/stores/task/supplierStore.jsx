import axios from "../../api/axios";

export const createSupplier = async (supplierData) => {
  try {
    const response = await axios.post("/Suplier/", supplierData);
    return response.data;
  } catch (error) {
    console.error("Error creating Supplier:", error.response.data);
    throw error;
  }
};

export const getsupplier = async () => {
  try {
    const response = await axios.get("/Supplier");
    return response.data;
  } catch (error) {
    console.error("Error fetching supplier:", error.response.data);
    throw error;
  }
};

export const updateSupplier = async (id, updatedSupplierData) => {
  try {
    const response = await axios.patch(`/Suplier/${id}`, updatedSupplierData);
    return response.data;
  } catch (error) {
    console.error("Error updating Supplier:", error.response.data);
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`/Suplier/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Supplier:", error.response.data);
    throw error;
  }
};
