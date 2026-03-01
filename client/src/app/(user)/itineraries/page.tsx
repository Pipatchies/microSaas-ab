"use client";

import Typography from "@/components/typography";
import { ItineraryList } from "./components/ItineraryList";

export default function ItinerariesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Typography variant="h2" className="text-3xl font-bold tracking-tight">
          A LA UNE
        </Typography>
      </div>
      <ItineraryList />
    </div>
  );
}
