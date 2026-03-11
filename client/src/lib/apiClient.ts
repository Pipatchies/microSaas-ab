const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in environment variables",
    );
  }
  return url;
};

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
  _retry?: boolean;
}

export const apiClient = {
  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, _retry, ...init } = options;

    let url = `${getBaseUrl()}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      credentials: "include", // Essential for HttpOnly cookies
    });

    if (!response.ok) {
      // Logic for Refresh Token Handling
      if (response.status === 401 && !_retry) {
        options._retry = true;

        try {
          // Attempt to refresh token
          const refreshResponse = await fetch(
            `${getBaseUrl()}/api/auth/token/refresh/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            },
          );

          if (refreshResponse.ok) {
            // Retry original request automatically
            return this.request<T>(endpoint, options);
          } else {
            console.error("Refresh token failed or expired");
            // If we fail to refresh, the user is effectively logged out
          }
        } catch (refreshError) {
          console.error("Refresh token network error", refreshError);
        }
      }

      const errorData = await response.json().catch(() => null);
      throw {
        status: response.status,
        data: errorData,
        message: `API Error: ${response.status}`,
      };
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  },

  get<T>(
    endpoint: string,
    params?: Record<string, string>,
    options: FetchOptions = {},
  ) {
    return this.request<T>(endpoint, { ...options, method: "GET", params });
  },

  post<T>(endpoint: string, body: any, options: FetchOptions = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body: any, options: FetchOptions = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body: any, options: FetchOptions = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, options: FetchOptions = {}) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
