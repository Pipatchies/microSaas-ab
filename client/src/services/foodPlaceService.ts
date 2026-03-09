import type { FoodPlace } from "@/types/itinerary";
import { apiClient } from "@/lib/apiClient";

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
      const data: any = await apiClient.get("/api/places/");
      return data.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching food places:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<FoodPlace | null> {
    try {
      const data = await apiClient.get<any>(`/api/places/${id}/`);
      return mapBackendToFrontend(data);
    } catch (error: any) {
      if (error.status === 404) return null;
      console.error(`Error fetching food place ${id}:`, error);
      throw error;
    }
  },

  async create(place: Omit<FoodPlace, "id_foodplace">): Promise<FoodPlace> {
    try {
      const data = await apiClient.post<any>("/api/places/", place);
      return mapBackendToFrontend(data);
    } catch (error: any) {
      console.error("Error creating food place:", error);
      if (error.data) {
        console.error("Backend validation error:", error.data);
      }
      throw error;
    }
  },

  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    try {
      await apiClient.delete(`/api/places/${id}/`);
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
