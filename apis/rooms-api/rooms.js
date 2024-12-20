import axios from "@/apis/api-constant";

export const getAllRooms = async (params) => {
    const url = "/api/rooms";
    try {
        const response = await axios.get(url, {
            params,
        });
        return response.data;
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
        throw error.response.data.error.message;
    }
};
