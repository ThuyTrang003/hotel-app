import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3000/api"
})

export async function ratingRoom() {
    try {
        const response = await api.get("/room/rating");
        if (response.status >= 200 && response.status < 300) {
            return { data: response.data, error: null };
        } 
    } catch (error) {
        console.error("Error fetching top-rated rooms:", error);
        return { data:null, error: error.message};
    }
}