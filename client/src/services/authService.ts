import { apiClient } from "@/lib/apiClient";

export const authService = {
  async login(credentials: Record<string, string>) {
    try {
      return await apiClient.post("/api/auth/login/", credentials);
    } catch (error: any) {
      console.error("Login Error:", error);

      let errorMessage = "Login failed";
      if (error.data) {
        if (error.data.detail) {
          errorMessage = error.data.detail;
        } else if (typeof error.data === "object") {
          const firstErrorKey = Object.keys(error.data)[0];
          const firstErrorValue = error.data[firstErrorKey];
          if (Array.isArray(firstErrorValue)) {
            errorMessage = firstErrorValue[0];
          } else if (typeof firstErrorValue === "string") {
            errorMessage = firstErrorValue;
          }
        }
      }
      throw new Error(errorMessage);
    }
  },

  async register(data: Record<string, string>) {
    try {
      return await apiClient.post("/api/auth/register/", data);
    } catch (error: any) {
      console.error("Registration Error:", error);

      let errorMessage = "Registration failed";
      if (error.data && typeof error.data === "object") {
        const firstErrorKey = Object.keys(error.data)[0];
        const firstErrorValue = error.data[firstErrorKey];
        if (Array.isArray(firstErrorValue)) {
          errorMessage = firstErrorValue[0];
        } else if (typeof firstErrorValue === "string") {
          errorMessage = firstErrorValue;
        } else if (error.data.detail) {
          errorMessage = error.data.detail;
        }
      }
      throw new Error(errorMessage);
    }
  },

  async logout() {
    try {
      return await apiClient.post("/api/auth/logout/", {});
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  },

  async getMe() {
    try {
      return await apiClient.get("/api/auth/me/");
    } catch (error: any) {
      if (error.status === 401) {
        return null; // Not logged in is a valid state
      }
      console.error("GetMe Error:", error);
      throw error;
    }
  },
};
