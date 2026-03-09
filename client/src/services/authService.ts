const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in environment variables",
    );
  }
  return url;
};

export const authService = {
  async login(credentials: Record<string, string>) {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Essential for HttpOnly cookies
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        let errorMessage = "Login failed";

        if (errorData) {
          if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (typeof errorData === "object") {
            const firstErrorKey = Object.keys(errorData)[0];
            const firstErrorValue = errorData[firstErrorKey];
            if (Array.isArray(firstErrorValue)) {
              errorMessage = firstErrorValue[0];
            } else if (typeof firstErrorValue === "string") {
              errorMessage = firstErrorValue;
            }
          }
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  async register(data: Record<string, string>) {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        let errorMessage = "Registration failed";

        if (errorData) {
          if (typeof errorData === "object") {
            // DRF validation errors are often objects like { email: ["..."], password: ["..."] }
            const firstErrorKey = Object.keys(errorData)[0];
            const firstErrorValue = errorData[firstErrorKey];
            if (Array.isArray(firstErrorValue)) {
              errorMessage = firstErrorValue[0];
            } else if (typeof firstErrorValue === "string") {
              errorMessage = firstErrorValue;
            } else if (errorData.detail) {
              errorMessage = errorData.detail;
            }
          }
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  },

  async logout() {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  },

  async getMe() {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/me/`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        return null; // Not logged in is a valid state
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      return await response.json();
    } catch (error) {
      console.error("GetMe Error:", error);
      throw error;
    }
  },
};
