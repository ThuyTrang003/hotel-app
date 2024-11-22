import axios from "@/apis/api-constant";

export const getAllBookings = async (params) => {
    const url = "/api/bookings";
    try {
        const response = await axios.get(url, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error("Get all bookings failed:", error);
        throw error.response.data.error;
    }
};

export const getBookingById = async (id) => {
    const url = `/api/bookings/${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get booking by id failed:", error);
        throw error.response.data.error;
    }
};
export const createBooking = async (payload) => {
    const url = "/api/bookings";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Create booking failed:", error);
        throw error.response.data.error;
    }
};

export const updateBookingById = async (payload) => {
    const url = `/api/bookings/${payload.id}`;
    try {
        const response = await axios.put(url, payload.data);
        return response.data;
    } catch (error) {
        console.error("Update booking failed:", error);
        throw error.response.data.error.message;
    }
};
