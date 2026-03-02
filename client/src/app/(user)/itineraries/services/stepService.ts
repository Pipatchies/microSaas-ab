import type { Step } from "@/types/itinerary";

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

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url)
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in environment variables",
    );
  return url;
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
      const response = await fetch(
        `${getBaseUrl()}/api/steps/?itinerary=${itineraryId}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch steps: ${response.status}`);
      }
      const data = await response.json();
      // If we don't have django filters set up yet, we'll filter on the frontend for now
      // This maps backend format to frontend format
      const mapped = data.map(mapBackendToFrontend);
      // Filter out steps not belonging to this itinerary
      return mapped.filter((step: Step) => step.itinerary_id === itineraryId);
    } catch (error) {
      console.error("Error fetching steps:", error);
      throw error;
    }
  },

  async getAll(): Promise<Step[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/steps/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch steps: ${response.status}`);
      }
      const data = await response.json();
      return data.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching steps:", error);
      throw error;
    }
  },

  async create(step: Omit<Step, "id_step">): Promise<Step> {
    try {
      // Create backend-compatible payload mapping itinerary_id back to itinerary if necessary
      const payload: any = { ...step };
      if (payload.itinerary_id && !payload.itinerary) {
        payload.itinerary = payload.itinerary_id;
      }

      if (payload.picture === "") payload.picture = null;
      if (payload.description === "") payload.description = null;

      // Map id_foodplace to Django's expected 'food_place' foreign key field
      if (payload.id_foodplace) {
        payload.food_place = payload.id_foodplace;
      }
      // Remove any leftover frontend objects hitting the API
      delete payload.foodplace;

      const response = await fetch(`${getBaseUrl()}/api/steps/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Backend validation error:", errorData);
        throw new Error(`Failed to create step: ${response.status}`);
      }

      const data = await response.json();
      return mapBackendToFrontend(data);
    } catch (error) {
      console.error("Error creating step:", error);
      throw error;
    }
  },

  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/steps/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete step: ${response.status}`);
      }

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
