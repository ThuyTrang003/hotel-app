import axios from "axios";

// Cấu hình Axios để gửi cookie
const apiClient = axios.create({
    baseURL: "http://localhost:3000/", // URL API của bạn
    withCredentials: true, // Cho phép gửi cookie cùng request
});
export default apiClient;
