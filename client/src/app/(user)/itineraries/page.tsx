"use client";

import { useEffect } from "react";
import { itineraryService } from "./services/itineraryService";
import { stepService } from "./services/stepService";

export default function ItinerariesPage() {
  useEffect(() => {
    itineraryService.getAll().then((data) => {
      console.log("Itinéraires :", data);
    });
  }, []);

  useEffect(() => {
    stepService.getByItinerary(1).then((steps) => {
      console.log("Steps de l'itinéraire 1 :", steps);
    });
  }, []);

  return <div>Itineraries Page</div>;
}
