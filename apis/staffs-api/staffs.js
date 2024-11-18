import axios from "@/apis/api-constant";

import { metadata } from "@/app/layout";

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
