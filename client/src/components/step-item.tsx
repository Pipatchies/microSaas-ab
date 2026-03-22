"use client";

import Typography from "@/components/typography";

export interface StepItemData {
  name: string;
  description?: string;
  picture?: string | File;
  distanceFromStart?: number;
  foodplace?: {
    name: string;
  } | null;
}

interface StepItemProps {
  step: StepItemData;
  index: number;
}

export function StepItem({ step, index }: StepItemProps) {
  return (
    <div className="relative flex gap-6 z-10 w-full">
      {/* Timeline Circle */}
      <div className="flex-none pt-1">
        <div className="w-10 h-10 rounded-full border-2 border-secondary bg-accent text-primary flex items-center justify-center font-bold text-lg shadow-sm">
          {index}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-2 pb-2">
        {/* Header: Title and Foodplace */}
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <Typography variant="h5" className="text-primary font-semibold">
            {step.name}
            {step.distanceFromStart !== undefined && (
              <span className="text-primary font-semibold">
                - {(step.distanceFromStart / 1000).toFixed(1)} km
              </span>
            )}
          </Typography>
          {step.foodplace?.name && (
            <Typography variant="h5" className="text-primary italic m-0">
              - {step.foodplace.name}
            </Typography>
          )}
        </div>

        {/* Body: Image and Description */}
        <div className="flex flex-col sm:flex-row gap-4">
          {step.picture && (
            <div className="flex-none shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  typeof step.picture === "string"
                    ? step.picture
                    : URL.createObjectURL(step.picture)
                }
                alt={step.name}
                className="w-[140px] h-[140px] rounded-xl object-cover shadow-sm"
              />
            </div>
          )}

          {step.description && (
            <div className="flex-1 text-sm text-[#4E4E4E] italic leading-relaxed whitespace-pre-wrap">
              {step.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
