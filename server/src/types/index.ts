export interface MarkerDetails {
  eventType: "car" | "motorcycle" | "event";
  date: string;
  brand?: string;
  model?: string;
  year?: number;
  eventCategory?: string;
  duration?: string;
}

export interface Marker {
  id: number;
  lat: number; // ✅ Use separate lat and lng properties
  lng: number;
  label?: string;
  details?: MarkerDetails;
  user_id: number;
}
