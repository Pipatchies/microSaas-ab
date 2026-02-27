"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapMouseEvent } from "react-map-gl/mapbox";
import ItineraryMap from "@/app/(user)/itineraries/_sections/spaceMap";
import ItineraryBottomPanel from "@/app/(user)/itineraries/_sections/spaceBottomPanel";
import { getDirections } from "@/services/mapboxService";
import { itineraryService } from "../services/itineraryService";
import { MapboxRoute } from "@/services/mapboxService";

export default function ItineraryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Rando");
  const [zone, setZone] = useState("");
  const [diet, setDiet] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [facts, setFacts] = useState("");

  // Map State
  const [waypoints, setWaypoints] = useState<{ lng: number; lat: number }[]>(
    [],
  );
  const [routeData, setRouteData] = useState<MapboxRoute | null>(null);

  const handleMapClick = async (e: MapMouseEvent) => {
    const newPoint = { lng: e.lngLat.lng, lat: e.lngLat.lat };
    const newWaypoints = [...waypoints, newPoint];
    setWaypoints(newWaypoints);

    // Calculate route if we have at least 2 points
    if (newWaypoints.length >= 2) {
      toast.loading("Calcul de l'itinéraire...");
      try {
        const result = await getDirections(type, newWaypoints);
        if (result) {
          setRouteData(result);
          toast.dismiss();
        } else {
          toast.dismiss();
          toast.error("Impossible de calculer l'itinéraire via la route.");
        }
      } catch (error) {
        toast.dismiss();
        console.error(error);
        toast.error("Erreur lors du calcul de l'itinéraire.");
      }
    } else {
      setRouteData(null);
    }
  };

  const handleTypeChange = async (newType: string) => {
    setType(newType);
    if (waypoints.length >= 2) {
      const result = await getDirections(newType, waypoints);
      if (result) setRouteData(result);
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!routeData) throw new Error("Aucun itinéraire tracé.");

      await itineraryService.create({
        title,
        type,
        zone: zone || "Non spécifiée",
        diet: diet || "Tous",
        speciality: speciality || "Aucune",
        facts,
        distance: routeData.distance,
      });

      toast.success("Itinéraire créé avec succès !");
      router.push("/itineraries");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de la création.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare GeoJSON for map
  const routeGeoJSON = routeData
    ? {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routeData.coordinates,
        },
      }
    : null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col md:flex-row bg-background">
      {/* Map Section */}
      <div className="relative flex-none md:flex-1 w-full md:w-auto h-[70dvh] md:h-full z-10">
        <ItineraryMap
          waypoints={waypoints}
          routeGeoJSON={routeGeoJSON}
          onMapClick={handleMapClick}
        />

        {/* Helper Badge for Type */}
        <div className="absolute top-24 left-6 md:top-24 md:left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-sm font-semibold text-primary z-10 border border-primary/10">
          Mode: {type}
        </div>
      </div>

      {/* Form Panel (Bottom on Mobile, Right on Desktop) */}
      <div className="relative z-20 w-full md:w-[450px] lg:w-[500px] shrink-0 flex-1 md:flex-none md:h-full bg-accent rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:shadow-[-10px_0_30px_rgba(0,0,0,0.05)] -mt-6 md:mt-0 overflow-y-auto pb-6 md:pb-0">
        <ItineraryBottomPanel
          title={title}
          onTitleChange={setTitle}
          type={type}
          onTypeChange={handleTypeChange}
          distance={routeData?.distance || 0}
          duration={routeData?.duration || 0}
          steps={waypoints.length}
          zone={zone}
          onZoneChange={setZone}
          diet={diet}
          onDietChange={setDiet}
          speciality={speciality}
          onSpecialityChange={setSpeciality}
          facts={facts}
          onFactsChange={setFacts}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
