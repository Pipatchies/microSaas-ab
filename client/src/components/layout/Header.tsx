"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Typography from "@/components/typography";
import { NavigationButton } from "@/components/layout/navigation-button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const showBackButton = pathname !== "/";

  // Mapping paths to titles
  const getPageTitle = (path: string) => {
    if (path.includes("/itineraries")) return "Itineraires";
    if (path.includes("/profile")) return "Mon Profil";
    if (path.includes("/community")) return "Communauté";
    if (path.includes("/favorites")) return "Favoris";
    return "TastyRoad";
  };

  if (pathname === "/itineraries/create") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
        <div className="pointer-events-auto w-fit">
          <NavigationButton variant="close" />
        </div>
      </header>
    );
  }

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-start pt-12 h-32 bg-primary rounded-b-[60%] shadow-lg transition-all duration-300">
      {/* Left: Back Button */}
      {showBackButton && (
        <NavigationButton variant="back" className="absolute left-6 top-6" />
      )}

      {/* Right: Logout Button (Only if authenticated) */}
      {isAuthenticated && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-6 top-6 text-accent hover:bg-white/10"
          onClick={logout}
          title="Se déconnecter"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      )}

      <div className="flex items-center w-full relative justify-center">
        {/* Center: Title */}
        <Typography variant="h1" className="text-accent">
          {getPageTitle(pathname)}
        </Typography>
      </div>
    </header>
  );
}
