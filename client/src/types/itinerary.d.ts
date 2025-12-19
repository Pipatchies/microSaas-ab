export type Itinerary = {
  id_itinerary?: number;
  title: string;
  type: string;
  zone: string;
  distance: number;
  diet: string;
  speciality: string;
  facts?: string;
};

export type Step = {
  id_step?: number;
  itinerary_id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
};
