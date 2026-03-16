"use client";

import type { Itinerary } from "@/types/itinerary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Trash2 } from "lucide-react";
import Typography from "@/components/typography";
import Image from "next/image";

interface ItineraryCardProps {
  itinerary: Itinerary;
  onDelete?: (id: number) => void;
}

export function ItineraryCard({ itinerary, onDelete }: ItineraryCardProps) {
  // Placeholder image if there's none in the DB
  const imageUrl =
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000";

  // Format duration: 1.75 → "1h45", 2.0 → "2h00"
  const formatDuration = (hours: any) => {
    const num = typeof hours === "string" ? parseFloat(hours) : Number(hours);
    if (isNaN(num)) return "0h00";
    if (num === 0) return "0h00";
    const h = Math.floor(num);
    const m = Math.round((num - h) * 60);
    if (h === 0 && m === 0 && num > 0) return "< 1m";
    return m > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${h}h00`;
  };

  return (
    <Card className="overflow-hidden relative border-none shadow-xl group rounded-lg h-[280px] sm:h-[350px] flex flex-col justify-end py-4">
      {/* Background Image Section */}
      <div className="absolute inset-0 z-0 bg-muted">
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt={itinerary.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
        />
        {/* Optional subtle gradient overlay so text/badges stand out better */}
        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
      </div>

      {/* Top Badges & Delete Button */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-start z-10">
        <Badge
          variant="secondary"
          className="bg-accent text-primary hover:bg-accent/90 text-sm px-4 py-1 font-semibold rounded-full shadow-sm"
        >
          {itinerary.difficulty}
        </Badge>

        <div className="flex flex-col items-end gap-3">
          <Badge
            variant="secondary"
            className="bg-accent text-foreground hover:bg-accent/90 text-sm px-3 py-1 font-semibold rounded-full shadow-sm flex items-center gap-1"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              {itinerary.average_rating
                ? Number(itinerary.average_rating).toFixed(1)
                : "N/A"}
            </span>
          </Badge>

          {/* Delete Button (Visible on hover) */}
          {onDelete && itinerary.id_itinerary && (
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full shadow-md w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(itinerary.id_itinerary!);
              }}
              data-testid={`delete-itinerary-${itinerary.id_itinerary}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content Section - Bottom Card */}
      <div className="relative z-10 px-3 pt-0 w-full">
        <Card className="bg-accent border-none shadow-sm rounded-lg p-3 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1 pr-2 overflow-hidden min-w-0">
              <Typography
                variant="h5"
                className="text-foreground text-sm leading-tight truncate"
              >
                {itinerary.title}
              </Typography>
              <div className="flex flex-row items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <Typography
                  variant="h6"
                  className="italic font-light text-xs m-0 p-0 leading-none truncate"
                >
                  {itinerary.zone}
                </Typography>
              </div>
            </div>
            <div className="flex flex-row gap-1.5 shrink-0 items-start">
              <Badge className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-2 py-0.5 font-medium text-[8px] sm:text-xs shadow-none whitespace-nowrap">
                {itinerary.type}
              </Badge>
              {itinerary.diet && (
                <Badge className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-2 py-0.5 font-medium text-[8px] sm:text-xs shadow-none whitespace-nowrap">
                  {itinerary.diet}
                </Badge>
              )}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex justify-center items-center gap-10 text-center mt-1">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-foreground leading-none text-secondary">
                {itinerary.distance}
              </span>
              <span className="text-xs mt-1">km</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-secondary leading-none">
                {formatDuration(itinerary.duration)}
              </span>
              <span className="text-xs mt-1">durée</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-secondary leading-none">
                {itinerary.steps?.length ?? 0}
              </span>
              <span className="text-xs mt-1">étapes</span>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
}
