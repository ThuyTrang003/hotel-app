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
