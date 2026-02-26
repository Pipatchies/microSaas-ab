export interface MapboxRoute {
  coordinates: number[][];
  distance: number;
  duration: number;
}

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const PROFILES: Record<string, string> = {
  Vélo: "mapbox/cycling",
  Moto: "mapbox/driving",
  Rando: "mapbox/walking",
};

export async function getDirections(
  type: string,
  waypoints: { lng: number; lat: number }[],
): Promise<MapboxRoute | null> {
  if (waypoints.length < 2 || !MAPBOX_ACCESS_TOKEN) return null;

  const profile = PROFILES[type] || "mapbox/driving";
  const coordinatesString = waypoints
    .map((wp) => `${wp.lng},${wp.lat}`)
    .join(";");

  const url = `https://api.mapbox.com/directions/v5/${profile}/${coordinatesString}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return {
        coordinates: route.geometry.coordinates,
        distance: route.distance,
        duration: route.duration,
      };
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
  }

  return null;
}
