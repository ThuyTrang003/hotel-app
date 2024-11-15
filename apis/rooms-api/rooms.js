import axios from "@/apis/api-constant";

export const getAllRooms = async (params) => {
    const url = "/api/rooms";
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
        console.error("Get all rooms failed:", error);
        throw error.response.data.error;
    }
};

export const createRoom = async (payload) => {
    const url = "/api/rooms";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Create room failed:", error);
        throw error.response.data.error;
    }
};

export const updateRoom = async (payload) => {
    const url = `/api/rooms/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update room failed:", error);
        throw error.response.data.error;
    }
};
