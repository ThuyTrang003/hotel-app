/* eslint-disable @typescript-eslint/no-explicit-any */
type UpdateData = {
  password?: string;
  fullName?: string;
  gender?: string;
  birthDate?: string;
  phoneNumber?: string;
  point?: number; 
  currentStatus?: string;
  feedback?: string;
  score?: number;
  _id?: string;
  bookingId?: {
    userId: {
      _id: string;
      fullName: string;
    };
  };
  createAt?: string;
};

class RestClient {
  baseUrl: string;
  path: string;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.baseUrl = baseUrl;
    this.path = "";
  }

  service(path: string) {
    this.path = path;
    return this;
  }

  async config(url: string) {
    this.baseUrl = url;
  }

  async authentication(strategy: any, email: any, password: any) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/${strategy}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  }

  async find(query = {}) {
    try {
      const url = new URL(`${this.baseUrl}/${this.path}`);
      Object.keys(query).forEach((key) =>
        url.searchParams.append(key, query[key])
      );
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const result = await response.json();
      console.log("RESULT", result);
  
      if (!result.metadata) {
        return { data: result, metadata: {} };
      }
  
      const { metadata = {}, data = [] } = result;
      return { data, metadata };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], metadata: {} };
    }
  }
  

  async get(id: string | null) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.path}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data for id ${id}:`, error);
    }
  }

  async create(data: { userId?: string | null; typeRooms?: any; checkInTime?: string; checkOutTime?: string; paidAmount?: number; numberOfGuests?: any; paymentMethod?: string; redeemedPoint?: number; bookingId?: any; typeRoomId?: never; score?: number; feedback?: string; }) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, errorData };
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  }
  

  async update(id: string, data: { currentStatus: string }): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const url = `${this.baseUrl}/${this.path}/${id}`;
      console.log("Sending request to:", url);
      console.log("Data sent to server:", data);
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
  
      console.log("Response status:", response.status);
  
      // Kiểm tra phản hồi từ backend
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with status: ${response.status} - ${response.statusText}`);
      }
  
      const text = await response.text();
      if (!text) {
        console.warn("Empty response from server.");
        return { success: true, message: "Booking updated with no content returned." };
      }
  
      const responseData = JSON.parse(text);
      return {
        success: true,
        data: responseData,
      };
    } catch (error: any) {
      console.error(`Error updating booking ${id}:`, error.message);
      return {
        success: false,
        message: error.message || "Unknown error occurred",
      };
    }
  }
  

  async delete(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.path}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error deleting data for id ${id}:`, error.message);
      return { success: false, message: error.message || "Unknown error" };
    }
  }

  async logout(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(
          `Server responded with status: ${response.status} - ${response.statusText}`
        );
      }
  
      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error: any) {
      console.error("Error during logout:", error.message);
      return {
        success: false,
        message: error.message || "Unknown error occurred",
      };
    }
  }
  async momoPayment(amount: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/bookings/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Payment error:", errorData);
        throw new Error(`Payment failed with status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error: any) {
      console.error("Error processing payment:", error.message);
      throw error;
    }
  }
}

export default RestClient;
