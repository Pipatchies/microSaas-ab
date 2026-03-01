import itineraries from "../data/mockItineraries.json";
import type { Itinerary } from "@/types/itinerary";

const USE_MOCK = true;

const mockApi = {
  async getAll(): Promise<Itinerary[]> {
    return [...itineraries];
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

const realApi = {
  async getAll(): Promise<Itinerary[]> {
    // return fetch("/api/itineraries").then(res => res.json());
    throw new Error("realApi not implemented yet");
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(
    _itinerary: Omit<Itinerary, "id_itinerary">,
  ): Promise<Itinerary> {
    // return fetch("/api/itineraries", { method: "POST", body: JSON.stringify(_itinerary) }).then(res => res.json())
    throw new Error("realApi not implemented yet");
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(_id: number): Promise<void> {
    // return fetch(`/api/itineraries/${id}`, { method: "DELETE" });
    throw new Error("realApi not implemented yet");
  },
};
export const itineraryService = USE_MOCK ? mockApi : realApi;
