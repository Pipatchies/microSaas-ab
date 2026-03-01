import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "px-9 py-5 rounded-xl font-medium text-base transition-transform active:scale-[0.98] cursor-pointer",
  {
    variants: {
      ctaVariant: {
        solid:
          "bg-secondary text-accent hover:bg-secondary/90 border-2 border-secondary shadow-md",
        outline:
          "bg-accent text-primary border-2 border-secondary hover:bg-accent/80",
      },
    },
    defaultVariants: {
      ctaVariant: "solid",
    },
  },
);

export interface CtaButtonProps
  extends
    Omit<React.ComponentProps<typeof Button>, "variant">,
    VariantProps<typeof ctaVariants> {
  text: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
}

export function CtaButton({
  text,
  iconLeft: IconLeft,
  iconRight: IconRight,
  ctaVariant,
  className,
  ...props
}: CtaButtonProps) {
  return (
    <Button
      variant="default"
      className={cn(ctaVariants({ ctaVariant, className }))}
      {...props}
    >
      {/* Icône à gauche */}
      {IconLeft && <IconLeft className="w-5 h-5 mr-2 shrink-0" />}

      {/* Texte du bouton */}
      <span>{text}</span>

      {/* Icône à droite */}
      {IconRight && <IconRight className="w-5 h-5 ml-2 shrink-0" />}
    </Button>
  );
}
