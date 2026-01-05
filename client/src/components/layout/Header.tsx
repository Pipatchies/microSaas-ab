"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/typography";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show header on login/register pages if needed,
  // or customize based on path. For now, we show everywhere.

  const showBackButton = pathname !== "/";

  // Mapping paths to titles for better UX
  const getPageTitle = (path: string) => {
    if (path === "/") return "TastyRoad";
    if (path.includes("/itineraries/create")) return "Nouveau Voyage";
    if (path.includes("/itineraries")) return "Itinéraires";
    if (path.includes("/profile")) return "Mon Profil";
    if (path.includes("/groups")) return "Groupes";
    if (path.includes("/favorites")) return "Favoris";
    return "TastyRoad";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-start pt-10 h-32 bg-primary rounded-b-[50%] shadow-lg transition-all duration-300">
      <div className="flex items-center w-full relative justify-center">
        {/* Left: Back Button */}
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 text-white hover:text-white/80"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Retour</span>
          </Button>
        )}

        {/* Center: Title */}
        <Typography variant="h1">{getPageTitle(pathname)}</Typography>

        {/* Right: Actions (Placeholder) */}
        <div className="absolute right-0 w-10">
          {/* Future: Add search or profile icon here */}
        </div>
      </div>
    </header>
  );
}
