import axios from "@/apis/api-constant";

export const getAllStaffs = async (params) => {
    const url = "/api/staffs";
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
        console.error("Get all staffs failed:", error);
        throw error.response.data.error;
    }
};

export const updateStaff = async (payload) => {
    const url = `/api/staffs/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update staff failed:", error);
        throw error.response.data.error.message;
    }
};
