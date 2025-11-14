import steps from "../data/mockSteps.json";
import type { Step } from "@/types/itinerary";

const USE_MOCK = true;

const mockApi = {
  async getByItinerary(itineraryId: number): Promise<Step[]> {
    return steps.filter((step) => step.itinerary_id === itineraryId);
  },

  async getAll(): Promise<Step[]> {
    return [...steps];
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

const realApi = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getByItinerary(_itineraryId: number): Promise<Step[]> {
    // return fetch(`/api/itineraries/${itineraryId}/steps`).then(res => res.json());
    throw new Error("realApi not implemented yet");
  },
  async getAll(): Promise<Step[]> {
    // return fetch("/api/steps").then(res => res.json());
    throw new Error("realApi not implemented yet");
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_step: Step): Promise<void> {
    // return fetch("/api/steps", { method: "POST", body: JSON.stringify(item) })
    throw new Error("realApi not implemented yet");
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(_id: number): Promise<void> {
    // return fetch(`/api/steps/${id}`, { method: "DELETE" });
    throw new Error("realApi not implemented yet");
  },
};

export const stepService = USE_MOCK ? mockApi : realApi;
