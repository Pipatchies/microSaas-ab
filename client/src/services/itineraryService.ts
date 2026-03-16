import type { Itinerary } from "@/types/itinerary";
import { apiClient } from "@/lib/apiClient";

const USE_MOCK = false;

const mockApi = {
  async getAll(): Promise<Itinerary[]> {
    return [];
  },
  async getTopRated(): Promise<Itinerary[]> {
    return [];
  },
  async create(itinerary: Omit<Itinerary, "id_itinerary">): Promise<Itinerary> {
    return {
      id_itinerary: Date.now(),
      ...itinerary,
    };
  },
  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    return {
      success: true,
      deletedId: id,
    };
  },
};

// Map backend 'id' to frontend 'id_itinerary' expectation
const mapBackendToFrontend = (data: any): Itinerary => {
  return {
    ...data,
    id_itinerary: data.id || data.id_itinerary,
  };
};

const realApi = {
  async getAll(): Promise<Itinerary[]> {
    try {
      const data: any = await apiClient.get("/api/itineraries/");
      const items = data.results || data;
      return items.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      throw error;
    }
  },

  async getTopRated(): Promise<Itinerary[]> {
    try {
      const data: any = await apiClient.get("/api/itineraries/", {
        ordering: "-average_rating",
      });
      const items = data.results || data;
      return items.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching top rated itineraries:", error);
      throw error;
    }
  },

  async create(itinerary: Omit<Itinerary, "id_itinerary">): Promise<Itinerary> {
    try {
      const data = await apiClient.post<any>("/api/itineraries/", itinerary);
      return mapBackendToFrontend(data);
    } catch (error: any) {
      console.error("Error creating itinerary:", error);
      if (error.data) {
        console.error("Backend validation error:", error.data);
      }
      throw error;
    }
  },

  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    try {
      await apiClient.delete(`/api/itineraries/${id}/`);
      return {
        success: true,
        deletedId: id,
      };
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      throw error;
    }
  },
};

export const itineraryService = USE_MOCK ? mockApi : realApi;
