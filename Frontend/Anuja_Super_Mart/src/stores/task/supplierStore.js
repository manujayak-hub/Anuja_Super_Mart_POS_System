import API from "../../api/axios";

export const createSupplier = async (SupplierData) => {
  try {
    const response = await API.post("/Suplier/", SupplierData);
    return response.data;
  } catch (error) {
    console.error("Error creating Supplier:", error.response.data);
    throw error;
  }
};

export const getsupplier = async () => {
  try {
    const response = await API.get("/Suplier/");
    return response.data;
  } catch (error) {
    console.error("Error fetching supplier:", error.response.data);
    throw error;
  }
};

export const updateSupplier = async (id, updatedSupplierData) => {
  try {
    const response = await API.patch(`/Suplier/${id}`, updatedSupplierData);
    return response.data;
  } catch (error) {
    console.error("Error updating Supplier:", error.response.data);
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await API.delete(`/Suplier/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Supplier:", error.response.data);
    throw error;
  }
};
