import axios from "@/apis/api-constant";

export const getAllTypeRooms = async (params) => {
    const url = "/api/type-rooms";
    try {
        const response = await axios.get(url, {
            params,
        });
        return response.data;
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
        throw error.response.data.error.message;
    }
};
