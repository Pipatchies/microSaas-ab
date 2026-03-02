"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapMouseEvent } from "react-map-gl/mapbox";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import ItineraryMap from "@/app/(user)/itineraries/_sections/spaceMap";
import ItineraryBottomPanel from "@/app/(user)/itineraries/_sections/spaceBottomPanel";
import StepDrawer, {
  StepDrawerData,
} from "@/app/(user)/itineraries/components/step-drawer";
import { getDirections } from "@/services/mapboxService";
import { itineraryService } from "../services/itineraryService";
import { stepService } from "../services/stepService";
import { MapboxRoute } from "@/services/mapboxService";

export const itineraryFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  type: z.string().min(1, "Le type est requis"),
  zone: z.string().min(1, "La zone est requise"),
  diet: z.string().min(1, "Le régime alimentaire est requis"),
  speciality: z.string().min(1, "La spécialité est requise"),
  difficulty: z.string().min(1, "La difficulté est requise"),
  facts: z.string().optional(),
});

export type ItineraryFormValues = z.infer<typeof itineraryFormSchema>;

export default function ItineraryForm() {
  const router = useRouter();

  // React Hook Form
  const methods = useForm<ItineraryFormValues>({
    resolver: zodResolver(itineraryFormSchema),
    defaultValues: {
      title: "",
      type: "Rando",
      zone: "",
      diet: "",
      speciality: "",
      difficulty: "",
      facts: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const currentType = watch("type");

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pendingPoint, setPendingPoint] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  // Map & Waypoints State
  const [waypoints, setWaypoints] = useState<
    (StepDrawerData & { lng: number; lat: number })[]
  >([]);
  const [routeData, setRouteData] = useState<MapboxRoute | null>(null);

  const handleMapClick = (e: MapMouseEvent) => {
    setPendingPoint({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    setIsDrawerOpen(true);
  };

  const onSaveDrawer = async (data: StepDrawerData) => {
    if (!pendingPoint) return;

    const newPoint = { ...pendingPoint, ...data };
    const newWaypoints = [...waypoints, newPoint];
    setWaypoints(newWaypoints);
    setIsDrawerOpen(false);
    setPendingPoint(null);

    // Calculate route if we have at least 2 points
    if (newWaypoints.length >= 2) {
      toast.loading("Calcul de l'itinéraire...");
      try {
        const result = await getDirections(
          currentType,
          newWaypoints.map((wp) => ({ lng: wp.lng, lat: wp.lat })),
        );
        if (result) {
          setRouteData(result);

          // Inject distance into waypoints
          // the 'legs' array length is always waypoints.length - 1
          let runningDistance = 0;
          const updatedWaypoints = newWaypoints.map((wp, index) => {
            if (index === 0) return { ...wp, distanceFromStart: 0 };
            runningDistance += result.legs[index - 1].distance;
            return { ...wp, distanceFromStart: runningDistance };
          });
          setWaypoints(updatedWaypoints);

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

  const handleTypeChangeMap = async (newType: string) => {
    setValue("type", newType);
    if (waypoints.length >= 2) {
      const result = await getDirections(
        newType,
        waypoints.map((wp) => ({ lng: wp.lng, lat: wp.lat })),
      );
      if (result) setRouteData(result);
    }
  };

  const onSubmit = async (data: ItineraryFormValues) => {
    try {
      if (!routeData) throw new Error("Aucun itinéraire tracé.");

      const newItinerary = await itineraryService.create({
        title: data.title,
        type: data.type,
        zone: data.zone,
        diet: data.diet,
        speciality: data.speciality,
        facts: data.facts || "",
        distance: routeData.distance,
        duration: routeData.duration,
        difficulty: data.difficulty,
      });

      if (newItinerary.id_itinerary) {
        // Sequential saving to respect ForeignKey dependencies: FoodPlace -> Step
        for (let i = 0; i < waypoints.length; i++) {
          const wp = waypoints[i];
          let createdFoodPlaceId = null;

          // 1. If step has a foodplace linked, create it first
          if (wp.foodplace) {
            const newFp = await import("../services/foodPlaceService").then(
              (m) =>
                m.foodPlaceService.create({
                  name: wp.foodplace!.name,
                  type: wp.foodplace!.type,
                  description: wp.foodplace!.description,
                  longitude: wp.lng,
                  latitude: wp.lat,
                  mapbox_id: undefined,
                }),
            );
            createdFoodPlaceId = newFp.id_foodplace;
          }

          // 2. Create the step and assign the foodplace ID if it exists
          await stepService.create({
            itinerary_id: newItinerary.id_itinerary as number,
            name: wp.name || `Étape ${i + 1}`,
            description: wp.description || "",
            picture: wp.picture || "",
            longitude: wp.lng,
            latitude: wp.lat,
            step_order: i + 1,
            id_foodplace: createdFoodPlaceId,
          } as any);
        }
      }

      toast.success("Itinéraire créé avec succès !");
      router.push("/itineraries");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de la création.");
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
          Mode: {currentType}
        </div>
      </div>

      {/* Form Panel (Bottom on Mobile, Right on Desktop) */}
      <div className="relative z-20 w-full md:w-[450px] lg:w-[500px] shrink-0 flex-1 md:flex-none md:h-full bg-accent rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:shadow-[-10px_0_30px_rgba(0,0,0,0.05)] -mt-6 md:mt-0 overflow-y-auto pb-6 md:pb-0">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ItineraryBottomPanel
              distance={routeData?.distance || 0}
              duration={routeData?.duration || 0}
              steps={waypoints.length}
              waypoints={waypoints}
              onTypeChangeMap={handleTypeChangeMap}
            />
          </form>
        </FormProvider>
      </div>

      <StepDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={onSaveDrawer}
        defaultStepName={
          waypoints.length === 0
            ? "Point de départ"
            : `Étape ${waypoints.length + 1}`
        }
      />
    </div>
  );
}
