"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Typography from "@/components/typography";
import { NavigationButton } from "@/components/layout/navigation-button";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const showBackButton = pathname !== "/";

  // Mapping paths to titles
  const getPageTitle = (path: string) => {
    if (path === "/") return "TastyRoad";
    if (path.includes("/itineraries/create")) return "Nouveau Voyage";
    if (path.includes("/itineraries")) return "Itineraires";
    if (path.includes("/profile")) return "Mon Profil";
    if (path.includes("/community")) return "Communauté";
    if (path.includes("/favorites")) return "Favoris";
    return "TastyRoad";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-start pt-12 h-32 bg-primary rounded-b-[60%] shadow-lg transition-all duration-300">
      {/* Left: Back Button */}
      {showBackButton && (
        <NavigationButton variant="back" className="absolute left-6 top-6" />
      )}

      <div className="flex items-center w-full relative justify-center">
        {/* Center: Title */}
        <Typography variant="h1">{getPageTitle(pathname)}</Typography>
      </div>
    </header>
  );
}
