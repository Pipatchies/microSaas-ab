"use client";

import Typography from "@/components/typography";
import { StepItem, type StepItemData } from "@/components/step-item";

interface StepListProps {
  steps: StepItemData[];
}

export function StepList({ steps }: StepListProps) {
  if (steps.length === 0) return null;

  return (
    <div className="pt-8 border-t border-primary/10">
      <Typography
        variant="h4"
        className="text-xl font-medium text-foreground mb-6 block"
      >
        Étapes de l'itinéraire
      </Typography>
      <div className="relative pl-6">
        {/* Vertical timeline line */}
        <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-primary/40 z-0"></div>

        <div className="space-y-8">
          {steps.map((wp, i) => (
            <StepItem key={i} step={wp} index={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
