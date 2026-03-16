import type { Step } from "@/types/itinerary";
import { apiClient } from "@/lib/apiClient";

const USE_MOCK = false;

const mockApi = {
  async getByItinerary(itineraryId: number): Promise<Step[]> {
    return [];
  },
  async getAll(): Promise<Step[]> {
    return [];
  },
  async create(step: Omit<Step, "id_step">): Promise<Step> {
    return {
      id_step: Date.now(),
      ...step,
    };
  },
  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    return {
      success: true,
      deletedId: id,
    };
  },
};

// Map backend 'id_step' 'itinerary' to frontend 'id_step' 'itinerary_id'
const mapBackendToFrontend = (data: any): Step => {
  return {
    ...data,
    id_step: data.id_step || data.id,
    itinerary_id: data.itinerary || data.itinerary_id,
  };
};

const realApi = {
  async getByItinerary(itineraryId: number): Promise<Step[]> {
    try {
      const data: any = await apiClient.get("/api/steps/", {
        itinerary: itineraryId.toString(),
      });
      const mapped = data.map(mapBackendToFrontend);
      return mapped.filter((step: Step) => step.itinerary_id === itineraryId);
    } catch (error) {
      console.error("Error fetching steps:", error);
      throw error;
    }
  },

  async getAll(): Promise<Step[]> {
    try {
      const data: any = await apiClient.get("/api/steps/");
      return data.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching steps:", error);
      throw error;
    }
  },

  async create(step: Omit<Step, "id_step">): Promise<Step> {
    try {
      const payload: any = { ...step };
      if (payload.itinerary_id && !payload.itinerary) {
        payload.itinerary = payload.itinerary_id;
      }
      if (!payload.picture) delete payload.picture;
      if (!payload.description) delete payload.description;

      if (payload.id_foodplace) {
        payload.food_place = payload.id_foodplace;
      }
      delete payload.foodplace;

      const data = await apiClient.post<any>("/api/steps/", payload);
      return mapBackendToFrontend(data);
    } catch (error: any) {
      console.error("Error creating step:", error);
      if (error.data) {
        console.error("Backend validation error:", error.data);
      }
      throw error;
    }
  },

  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    try {
      await apiClient.delete(`/api/steps/${id}/`);
      return {
        success: true,
        deletedId: id,
      };
    } catch (error) {
      console.error("Error deleting step:", error);
      throw error;
    }
  },
};

export const stepService = USE_MOCK ? mockApi : realApi;
