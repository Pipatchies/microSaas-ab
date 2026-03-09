export type Itinerary = {
  id_itinerary?: number;
  title: string;
  type: string;
  zone: string;
  distance: number;
  duration: number;
  difficulty: string;
  diet: string;
  speciality: string;
  facts?: string;
  steps?: Step[];
};

export type FoodPlace = {
  id_foodplace?: number;
  name: string;
  type: string;
  longitude: number;
  latitude: number;
  description: string;
  mapbox_id?: number;
};

export type Step = {
  id_step?: number;
  itinerary_id?: number;
  id_foodplace?: number | null;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  picture?: string;
  step_order: number;
  foodplace?: FoodPlace | null;
};
