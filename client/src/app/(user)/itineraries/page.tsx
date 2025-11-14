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
        const steps = await stepService.getByItinerary(
          itineraries[0].id_itinerary,
        );
        console.log(
          `Steps for Itinerary ${itineraries[0].id_itinerary}:`,
          steps,
        );
      }
    }

    fetchData();
  }, []);

  return <div>Itineraries Page</div>;
}
