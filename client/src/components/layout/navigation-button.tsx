"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationButtonProps {
  variant?: "back" | "close";
  onClick?: () => void;
  className?: string;
}

export function NavigationButton({
  variant = "back",
  onClick,
  className,
}: NavigationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "bg-accent border-2 border-secondary text-primary rounded-full hover:bg-accent/90 transition-colors",
        className,
      )}
      onClick={handleClick}
    >
      {variant === "back" ? (
        <>
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Retour</span>
        </>
      ) : (
        <>
          <X className="h-6 w-6" />
          <span className="sr-only">Fermer</span>
        </>
      )}
    </Button>
  );
}
