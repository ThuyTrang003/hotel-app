import axios from "@/apis/api-constant";

export const getAllCustomers = async (params) => {
    const url = "/api/customers";
    try {
        const response = await axios.get(url, {
            params,
        });
        const totalCount = response.headers.get("X-Total-Count");
        return {
            data: response.data,
            totalCount: totalCount ? parseInt(totalCount, 10) : 0, // đảm bảo totalCount là số
        };
    } catch (error) {
        console.error("Get all customers failed:", error);
        throw error.response.data.error;
    }
};

export const getCustomerById = async (id) => {
    const url = `/api/customers/${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get all customers failed:", error);
        throw error.response.data.error;
    }
};

export const updateCustomer = async (payload) => {
    const url = `/api/customers/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update customer failed:", error);
        throw error.response.data.error.message;
    }
};
