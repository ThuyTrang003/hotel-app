import axios from "@/apis/api-constant";

export const getAllPromotions = async (params) => {
    const url = "/api/vouchers";
    try {
        const response = await axios.get(url, {
            params,
        });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

export const getPromotionById = async (id) => {
    const url = `/api/vouchers/${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get promotion by id failed:", error);
        throw error.response.data.error;
    }
};
export const createPromotion = async (payload) => {
    const url = "/api/vouchers";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Create promotion failed:", error);
        throw error.response.data.error;
    }
};

export const updatePromotionById = async (payload) => {
    const url = `/api/vouchers/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update promotion failed:", error);
        throw error.response.data.error.message;
    }
};

export const deletePromotionById = async (id) => {
    const url = `/api/vouchers/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Delete promotion by id failed:", error);
        throw error.response.data.error;
    }
};
