import axios from "@/apis/api-constant";

export const getAllStaffs = async (params) => {
    const url = "/api/staffs";
    try {
        const response = await axios.get(url, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error("Get all staffs failed:", error);
        throw error.response.data.error;
    }
};
