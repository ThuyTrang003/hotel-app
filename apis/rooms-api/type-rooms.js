import axios from "@/apis/api-constant";

export const getAllTypeRooms = async () => {
    const url = "/api/type-rooms";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get all type rooms failed:", error);
        throw error.response.data.error;
    }
};
