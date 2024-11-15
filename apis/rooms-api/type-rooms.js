import axios from "@/apis/api-constant";

export const getAllTypeRooms = async (params) => {
    const url = "/api/type-rooms";
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
        console.error("Get all type rooms failed:", error);
        throw error.response.data.error;
    }
};

export const createTypeRoom = async (formData) => {
    const url = "/api/type-rooms";
    try {
        const response = await axios.post(url, formData);
        return response.data;
    } catch (error) {
        console.error("Create type rooms failed:", error);
        throw error.response.data.error;
    }
};

export const updateTypeRoom = async (payload) => {
    const url = `/api/type-rooms/${payload.id}`;
    try {
        const response = await axios.put(url, payload.formData);
        return response.data;
    } catch (error) {
        console.error("Update type room failed:", error);
        throw error.response.data.error;
    }
};
