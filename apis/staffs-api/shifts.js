import axios from "@/apis/api-constant";

export const getAllShifts = async () => {
    const url = "/api/shifts";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get all shifts failed:", error);
        throw error.response.data.error;
    }
};

export const getShiftById = async (id) => {
    const url = `/api/shifts/${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get shift by id failed:", error);
        throw error.response.data.error;
    }
};
export const createShift = async (payload) => {
    const url = "/api/shifts";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Create shift failed:", error);
        throw error.response.data.error;
    }
};

export const updateShiftById = async (payload) => {
    const url = `/api/shifts/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update shift failed:", error);
        throw error.response.data.error.message;
    }
};

export const deleteShiftById = async (id) => {
    const url = `/api/shifts/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Delete shift by id failed:", error);
        throw error.response.data.error;
    }
};
