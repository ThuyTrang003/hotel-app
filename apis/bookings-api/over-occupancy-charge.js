import axios from "@/apis/api-constant";

export const getAllOverOccupancyCharge = async () => {
    const url = "/api/over-occupancy-charges";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get all over occupancy charges failed:", error);
        throw error.response.data.error.message;
    }
};

export const getOverOccupancyChargeById = async (id) => {
    const url = `/api/over-occupancy-charges/${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get over occupancy charges by id failed:", error);
        throw error.response.data.error.message;
    }
};
export const createOverOccupancyCharge = async (payload) => {
    const url = "/api/over-occupancy-charges";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Create over occupancy charges failed:", error);
        throw error.response.data.error.message;
    }
};

export const updateOverOccupancyChargeById = async (payload) => {
    const url = `/api/over-occupancy-charges/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update over occupancy charges failed:", error);
        throw error.response.data.error.message;
    }
};

export const deleteOverOccupancyChargeById = async (id) => {
    const url = `/api/over-occupancy-charges/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Delete over occupancy charges by id failed:", error);
        throw error.response.data.error;
    }
};
