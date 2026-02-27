"use client";

import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import { MapPin, Flag } from "lucide-react";
import { CtaButton } from "@/components/cta-button";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface ItineraryMapProps {
  waypoints: { lng: number; lat: number }[];
  routeGeoJSON: any;
  onMapClick: (e: MapMouseEvent) => void;
}

export default function ItineraryMap({
  waypoints,
  routeGeoJSON,
  onMapClick,
}: ItineraryMapProps) {
  const startPoint = waypoints[0];
  const endPoint =
    waypoints.length > 1 ? waypoints[waypoints.length - 1] : null;

  return (
    <section className="relative w-full h-[65vh] md:h-[70vh] md:rounded-2xl overflow-hidden shadow-inner bg-gray-50">
      <Map
        initialViewState={{
          longitude: 2.3522,
          latitude: 48.8566,
          zoom: 5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={onMapClick}
      >
        <NavigationControl position="bottom-right" />

        {/* Route Line Layer */}
        {routeGeoJSON && (
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer
              id="route-line"
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#e11d48", // Primary color (red-ish)
                "line-width": 4,
                "line-opacity": 0.8,
              }}
            />
          </Source>
        )}

        {/* Start Point Marker */}
        {startPoint && (
          <Marker
            longitude={startPoint.lng}
            latitude={startPoint.lat}
            anchor="bottom"
          >
            <div className="relative group">
              <MapPin className="text-green-600 w-8 h-8 drop-shadow-md fill-current" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Départ
              </span>
            </div>
          </Marker>
        )}

        {/* Waypoints (Intermediate) */}
        {waypoints.slice(1, -1).map((wp, index) => (
          <Marker
            key={index}
            longitude={wp.lng}
            latitude={wp.lat}
            anchor="center"
          >
            <div className="w-3 h-3 bg-white border-2 border-primary rounded-full shadow-sm" />
          </Marker>
        ))}

        {/* End Point Marker */}
        {endPoint && (
          <Marker
            longitude={endPoint.lng}
            latitude={endPoint.lat}
            anchor="bottom-left"
          >
            <div className="relative group">
              <Flag className="text-red-600 w-8 h-8 drop-shadow-md fill-current" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Arrivée
              </span>
            </div>
          </Marker>
        )}
      </Map>

      {/* Overlay: Add Start Point Button (if empty) */}
      {waypoints.length === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-auto">
          <CtaButton
            text="Ajouter le point de départ"
            iconLeft={MapPin}
            ctaVariant="solid"
            className="shadow-xl"
          />
        </div>
      )}
    </section>
  );
}
