"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { CtaButton } from "@/components/cta-button";

export function AddItineraryButton() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-max flex justify-center">
      <Link href={isAuthenticated ? "/itineraries/create" : "/login"}>
        <CtaButton text="Ajouter un itinéraire" ctaVariant="solid" />
      </Link>
    </div>
  );
}
