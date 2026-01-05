"use client";

import { Home, Users, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const checkActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const getLinkClass = (path: string) =>
    checkActive(path) ? "text-secondary" : "text-white hover:text-white";

  const getIconClass = (path: string) =>
    `h-6 w-6 transition-colors group-hover:fill-white ${
      checkActive(path) ? "fill-white" : ""
    }`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#062D2A] px-6 py-4 pb-safe transition-all duration-300 shadow-t-lg">
      <nav className="flex items-center justify-between max-w-md mx-auto">
        <Link
          href="/"
          className={`group flex flex-col items-center gap-1 transition-colors ${getLinkClass(
            "/",
          )}`}
        >
          <Home className={getIconClass("/")} />
        </Link>
        <Link
          href="/community"
          className={`group flex flex-col items-center gap-1 transition-colors ${getLinkClass(
            "/community",
          )}`}
        >
          <Users className={getIconClass("/community")} />
        </Link>
        <Link
          href="/favorites"
          className={`group flex flex-col items-center gap-1 transition-colors ${getLinkClass(
            "/favorites",
          )}`}
        >
          <Heart className={getIconClass("/favorites")} />
        </Link>
        <Link
          href="/profile"
          className={`group flex flex-col items-center gap-1 transition-colors ${getLinkClass(
            "/profile",
          )}`}
        >
          <User className={getIconClass("/profile")} />
        </Link>
      </nav>
    </footer>
  );
}
