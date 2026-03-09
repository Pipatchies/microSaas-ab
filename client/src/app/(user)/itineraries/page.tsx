import { Suspense } from "react";
import Typography from "@/components/typography";
import { ItineraryList } from "@/components/itinerary-list";
import { AddItineraryButton } from "@/app/(user)/itineraries/components/add-itinerary-button";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ItinerariesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const typeParam =
    typeof resolvedSearchParams.type === "string"
      ? resolvedSearchParams.type
      : null;

  return (
    <div className="container mx-auto pt-8 pb-32 px-4 md:px-0">
      <section className="mb-4">
        <Typography variant="h2" className="text-3xl font-bold tracking-tight">
          A LA UNE
        </Typography>
      </section>
      <section>
        <Suspense
          fallback={<div className="p-4 text-center">Chargement...</div>}
        >
          <ItineraryList selectedType={typeParam} />
        </Suspense>
      </section>

      {/* Floating Action Button (Client Component) */}
      <AddItineraryButton />
    </div>
  );
}
