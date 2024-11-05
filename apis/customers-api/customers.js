import axios from "@/apis/api-constant";

export const getAllCustomers = async () => {
    const url = "/api/customers";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get all customers failed:", error);
        throw error.response.data.error;
    }
};
