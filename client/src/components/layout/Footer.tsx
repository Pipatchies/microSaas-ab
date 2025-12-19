"use client";

import { Home, Users, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-primary" : "text-white/80";
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#062D2A] p-4 pb-6">
      <nav className="flex items-center justify-around">
        <Link href="/" className={isActive("/")}>
          <Home className="h-8 w-8" />
        </Link>
        <Link href="/groups" className={isActive("/groups")}>
          <Users className="h-8 w-8" />
        </Link>
        <Link href="/favorites" className={isActive("/favorites")}>
          <Heart className="h-8 w-8" />
        </Link>
        <Link href="/profile" className={isActive("/profile")}>
          <User className="h-8 w-8" />
        </Link>
      </nav>
    </footer>
  );
}
