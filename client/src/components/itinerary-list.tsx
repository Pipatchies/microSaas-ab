"use client";

import { useEffect, useState } from "react";
import { itineraryService } from "../app/(user)/itineraries/services/itineraryService";
import type { Itinerary } from "@/types/itinerary";
import { ItineraryCard } from "./itinerary-card";

interface ItineraryListProps {
  selectedType?: string | null;
}

export function ItineraryList({ selectedType }: ItineraryListProps) {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const data = await itineraryService.getAll();
        setItineraries(data);
      } catch (error) {
        console.error("Failed to fetch itineraries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await itineraryService.delete(id);
      setItineraries((prev) =>
        prev.filter((itinerary) => itinerary.id_itinerary !== id),
      );
    } catch (error) {
      console.error("Failed to delete itinerary:", error);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Chargement...</div>;
  }

  const filteredItineraries = selectedType
    ? itineraries.filter((it) => it.type === selectedType)
    : itineraries;

  if (filteredItineraries.length === 0) {
    return <div className="p-4 text-center">Aucun itinéraire trouvé.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id_itinerary}
          itinerary={itinerary}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
