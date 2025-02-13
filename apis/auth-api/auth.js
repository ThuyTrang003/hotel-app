import axios from "@/apis/api-constant";

export const signin = async (payload) => {
    const url = "/api/auth/login";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error.response.data.error.message;
    }
};

export const signup = async (payload) => {
    payload = {
        fullName: payload.fullName,
        birthDate: payload.dateOfBirth,
        email: payload.email,
        gender: payload.gender,
        password: payload.password,
        phoneNumber: payload.phoneNumber,
        role: payload.role,
    };
    const url = "/api/auth/signup";
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error.response.data.error.message;
    }
};

export const logout = async () => {
    const url = "/api/auth/logout";
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        throw error.response.data.error;
    }
};
export const verifyEmail = async (token) => {
    const url = "/api/auth/verify";
    try {
        const response = await axios.get(url, { token });
        return response.data.message;
    } catch (error) {
        console.error("Verify email failed:", error);
        throw error.response.data.error;
    }
};

export const getIsAuthorization = async () => {
    const url = "/api/auth/current-user";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

// Hàm truy cập dữ liệu bảo mật
const fetchProtectedData = async () => {
    try {
        const response = await axios.get("http://localhost:3000/protected", {
            withCredentials: true, // Đảm bảo rằng cookie sẽ được gửi kèm theo yêu cầu
        });

        console.log(response.data); // Dữ liệu bảo mật được truy cập
    } catch (error) {
        console.error("Error accessing protected data:", error.response.data);
        throw error;
    }
};
