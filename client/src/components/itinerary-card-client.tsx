"use client";

import { useState } from "react";
import { ItineraryCard } from "./itinerary-card";
import type { Itinerary } from "@/types/itinerary";
import { itineraryService } from "@/services/itineraryService";

export function ItineraryCardClient({ itinerary }: { itinerary: Itinerary }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await itineraryService.delete(id);
      setIsDeleted(true);
    } catch (error) {
      console.error("Failed to delete itinerary:", error);
    }
  };

  if (isDeleted) return null;

  return <ItineraryCard itinerary={itinerary} onDelete={handleDelete} />;
}
