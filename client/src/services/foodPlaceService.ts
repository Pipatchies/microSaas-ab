import type { FoodPlace } from "@/types/itinerary";

const USE_MOCK = false;

const mockApi = {
  async getAll(): Promise<FoodPlace[]> {
    return [];
  },
  async getById(id: number): Promise<FoodPlace | null> {
    return null;
  },
  async create(place: Omit<FoodPlace, "id_foodplace">): Promise<FoodPlace> {
    return {
      id_foodplace: Date.now(),
      ...place,
    };
  },
  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    return {
      success: true,
      deletedId: id,
    };
  },
};

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url)
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in environment variables",
    );
  return url;
};

// Map backend 'id' and 'foodplace' to frontend 'id_foodplace'
const mapBackendToFrontend = (data: any): FoodPlace => {
  return {
    ...data,
    id_foodplace: data.id_foodplace || data.id,
  };
};

const realApi = {
  async getAll(): Promise<FoodPlace[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/places/`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch food places: ${response.status}`);
      }
      const data = await response.json();
      return data.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching food places:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<FoodPlace | null> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/places/${id}/`, {
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch food place: ${response.status}`);
      }
      const data = await response.json();
      return mapBackendToFrontend(data);
    } catch (error) {
      console.error(`Error fetching food place ${id}:`, error);
      throw error;
    }
  },

  async create(place: Omit<FoodPlace, "id_foodplace">): Promise<FoodPlace> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/places/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Backend validation error:", errorData);
        throw new Error(`Failed to create food place: ${response.status}`);
      }

      const data = await response.json();
      return mapBackendToFrontend(data);
    } catch (error) {
      console.error("Error creating food place:", error);
      throw error;
    }
  },

  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/places/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete food place: ${response.status}`);
      }

      return {
        success: true,
        deletedId: id,
      };
    } catch (error) {
      console.error("Error deleting food place:", error);
      throw error;
    }
  },
};

export const foodPlaceService = USE_MOCK ? mockApi : realApi;
