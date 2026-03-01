"use client";

import Typography from "@/components/typography";
import { ItineraryList } from "../../../components/itinerary-list";

export default function ItinerariesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="mb-4">
        <Typography variant="h2" className="text-3xl font-bold tracking-tight">
          A LA UNE
        </Typography>
      </div>
      <ItineraryList />
    </div>
  );
}
