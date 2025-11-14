import itineraries from "../data/mockItineraries.json";

export const itineraryService = {
  async getAll() {
    return itineraries;
  },
};
