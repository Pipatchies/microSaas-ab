import type { Itinerary } from "@/types/itinerary";

const USE_MOCK = false;

const mockApi = {
  async getAll(): Promise<Itinerary[]> {
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

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url)
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in environment variables",
    );
  return url;
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
      const response = await fetch(`${getBaseUrl()}/api/itineraries/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch itineraries: ${response.status}`);
      }
      const data = await response.json();
      // L'API est désormais paginée, les données sont dans 'results'
      const items = data.results || data;
      return items.map(mapBackendToFrontend);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      throw error;
    }
  },

  async create(itinerary: Omit<Itinerary, "id_itinerary">): Promise<Itinerary> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/itineraries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itinerary),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Backend validation error:", errorData);
        throw new Error(`Failed to create itinerary: ${response.status}`);
      }

      const data = await response.json();
      return mapBackendToFrontend(data);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      throw error;
    }
  },

  async delete(id: number): Promise<{ success: boolean; deletedId: number }> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/itineraries/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete itinerary: ${response.status}`);
      }

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
