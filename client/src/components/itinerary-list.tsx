import { itineraryService } from "@/services/itineraryService";
import type { Itinerary } from "@/types/itinerary";
import { ItineraryCardClient } from "./itinerary-card-client";

interface ItineraryListProps {
  selectedType?: string | null;
}

export async function ItineraryList({ selectedType }: ItineraryListProps) {
  let itineraries: Itinerary[] = [];
  try {
    itineraries = await itineraryService.getTopRated();
  } catch (error) {
    console.error("Failed to fetch itineraries:", error);
    return (
      <div className="p-4 text-center text-red-500">
        Erreur lors du chargement des itinéraires.
      </div>
    );
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
        <ItineraryCardClient
          key={itinerary.id_itinerary}
          itinerary={itinerary}
        />
      ))}
    </div>
  );
}
