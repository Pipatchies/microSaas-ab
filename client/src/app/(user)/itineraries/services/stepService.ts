import steps from "../data/mockSteps.json";

export const stepService = {
  async getByItinerary(itineraryId: number) {
    return steps.filter((step) => step.itinerary_id === itineraryId);
  },
};
