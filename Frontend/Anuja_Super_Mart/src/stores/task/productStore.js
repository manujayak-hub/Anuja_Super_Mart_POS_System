import API from "../../api/axios";

export const createProduct = async (ProductData) => {
  try {
    const response = await API.post("/orderproduct/", ProductData);
    return response.data;
  } catch (error) {
    console.error("Error creating Product:", error.response.data);
    throw error;
  }
};

export const getproducts = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response.data);
    throw error;
  }
};

export const updateProduct = async (id, updatedProductData) => {
  try {
    const response = await API.patch(`/orderproduct/${id}`, updatedProductData);
    return response.data;
  } catch (error) {
    console.error("Error updating Product:", error.response.data);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await API.delete(`/orderproduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Product:", error.response.data);
    throw error;
  }
};
