"use client";

import { Home, Users, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Exact match for home, startsWith for others to handle subpaths if needed (though usually nav links are exact)
    if (path === "/" && pathname !== "/")
      return "text-white/60 hover:text-white";
    if (path !== "/" && pathname.startsWith(path)) return "text-secondary";
    return pathname === path
      ? "text-secondary"
      : "text-white/60 hover:text-white";
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#062D2A] px-6 py-4 pb-safe transition-all duration-300 shadow-t-lg">
      <nav className="flex items-center justify-between max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive("/")}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Accueil</span>
        </Link>
        <Link
          href="/community"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive("/community")}`}
        >
          <Users className="h-6 w-6" />
          <span className="text-[10px] font-medium">Groupes</span>
        </Link>
        <Link
          href="/favorites"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive("/favorites")}`}
        >
          <Heart className="h-6 w-6" />
          <span className="text-[10px] font-medium">Favoris</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 transition-colors ${isActive("/profile")}`}
        >
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </nav>
    </footer>
  );
}
