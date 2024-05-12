import axios from "../../api/axios";

export const createProduct = async (productData) => {
  try {
    const response = await axios.post("/sproduct/", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating Product:", error.response.data);
    throw error;
  }
};

export const getproducts = async () => {
  try {
    const response = await axios.get("/inventory/");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response.data);
    throw error;
  }
};

export const updateProduct = async (id, updatedProductData) => {
  try {
    const response = await axios.patch(`/sproduct/${id}`, updatedProductData);
    return response.data;
  } catch (error) {
    console.error("Error updating Product:", error.response.data);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/sproduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Product:", error.response.data);
    throw error;
  }
};
