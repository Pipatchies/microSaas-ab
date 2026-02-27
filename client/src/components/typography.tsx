import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Typage commun pour tous les éléments
type CommonTypographyProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

// Typage spécial pour les liens
type LinkTypographyProps = CommonTypographyProps & {
  variant: "a";
  href: string; // `href` est obligatoire si variant est "a"
};

// Typage pour les autres éléments
type NonLinkTypographyProps = CommonTypographyProps & {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "p" | "label";
};

// Union des deux types
type TypographyProps = LinkTypographyProps | NonLinkTypographyProps;

const variantClasses: Record<string, string> = {
  // Titres principaux - NanumMyeongjo (font-heading)
  h1: "font-heading text-4xl font-bold text-foreground leading-tight text-white",
  h2: "font-heading text-3xl font-bold text-foreground leading-snug text-white",
  h3: "font-heading text-2xl font-bold text-foreground leading-snug text-white",

  // Sous-titres - Rubik (font-subtitle)
  h4: "font-subtitle text-lg font-semibold text-foreground leading-relaxed text-white",
  h5: "font-subtitle text-lg text-foreground leading-relaxed text-white",
  h6: "font-subtitle text-base font-semibold text-foreground leading-relaxed text-white",
  label: "font-subtitle text-base text-foreground leading-relaxed text-white",

  // Paragraphes - Libre Franklin (font-body)
  p: "font-body text-base text-foreground leading-relaxed text-white",
  small: "font-body text-sm text-muted-foreground leading-relaxed text-white",

  // Liens
  a: "font-body text-primary underline hover:text-secondary transition-colors",
};

// Le composant `Typography`
const Typography: React.FC<TypographyProps> = React.memo(
  ({ variant, children, className, ...props }: TypographyProps) => {
    const Component = variant;

    // Calcul des classes via `cn` (qui combine `clsx` et `tailwind-merge`)
    const computedClassName = cn(variantClasses[variant], className);

    // Cas particulier pour les liens
    if (variant === "a") {
      const { href } = props as LinkTypographyProps;
      return (
        <Link href={href} className={computedClassName}>
          {children}
        </Link>
      );
    }

    // Comportement par défaut pour les autres variantes
    return (
      <Component className={computedClassName} {...props}>
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

export default Typography;
