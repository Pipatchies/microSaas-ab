"use client";

import Typography from "@/components/typography";
import { ItineraryList } from "../../../components/itinerary-list";
import { CtaButton } from "@/components/cta-button";
import Link from "next/link";

export default function ItinerariesPage() {
  return (
    <div className="container mx-auto pt-8 pb-32 px-4 md:px-0">
      <section className="mb-4">
        <Typography variant="h2" className="text-3xl font-bold tracking-tight">
          A LA UNE
        </Typography>
      </section>
      <section>
        <ItineraryList />
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-max flex justify-center">
        <Link href="/itineraries/create">
          <CtaButton text="Ajouter un itinéraire" ctaVariant="solid" />
        </Link>
      </div>
    </div>
  );
}
