"use client";

import { useEffect } from "react";
import { itineraryService } from "./services/itineraryService";
import { stepService } from "./services/stepService";

export default function ItinerariesPage() {
  useEffect(() => {
    async function fetchData() {
      const itineraries = await itineraryService.getAll();
      console.log("Itineraries:", itineraries);

      if (itineraries.length > 0) {
        const itineraryId = itineraries[0].id_itinerary;
        if (itineraryId !== undefined) {
          const steps = await stepService.getByItinerary(itineraryId);
          console.log(`Steps for Itinerary ${itineraryId}:`, steps);
        }
      }
    }

    fetchData();
  }, []);

  return <div>Itineraries Page</div>;
}
