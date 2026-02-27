"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Route, Clock, MapPin } from "lucide-react";

interface ItineraryBottomPanelProps {
  title: string;
  onTitleChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  distance: number;
  duration: number;
  steps: number;

  // Extra fields
  zone: string;
  onZoneChange: (value: string) => void;
  diet: string;
  onDietChange: (value: string) => void;
  speciality: string;
  onSpecialityChange: (value: string) => void;
  facts: string;
  onFactsChange: (value: string) => void;

  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ItineraryBottomPanel({
  title,
  onTitleChange,
  type,
  onTypeChange,
  distance,
  duration,
  steps,

  zone,
  onZoneChange,
  diet,
  onDietChange,
  speciality,
  onSpecialityChange,
  facts,
  onFactsChange,

  onSubmit,
  isSubmitting,
}: ItineraryBottomPanelProps) {
  // Format duration
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <section className="bg-accent rounded-t-3xl p-6 md:p-8 space-y-6 md:space-y-8 min-h-full">
      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label className="text-base md:text-sm font-medium text-primary block">
          Titre de l'itinéraire
        </label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder=""
          className="text-lg font-medium border-secondary border-2 h-11 focus-visible:ring-secondary/50 bg-white"
        />
      </div>

      {/* Short Stats Row */}
      <div className="max-w-md w-full mx-auto flex justify-between items-center gap-6 py-4">
        <div className="flex flex-col items-center gap-2 text-foreground">
          <Route className="w-8 h-8 text-secondary mb-1" />
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">
              {(distance / 1000).toFixed(2)}
            </span>
            <span className="text-base font-semibold text-foreground">km</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-foreground">
          <Clock className="w-8 h-8 text-secondary mb-1" />
          <div className="text-3xl font-bold">{formattedDuration}</div>
        </div>
        <div className="flex flex-col items-center gap-2 text-foreground">
          <MapPin className="w-8 h-8 text-secondary mb-1" />
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{steps}</span>
            <span className="text-base font-semibold text-foreground">
              étapes
            </span>
          </div>
        </div>
      </div>

      {/* Additional Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-primary/10">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
            Moyen de transport
          </label>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full bg-white h-10 text-sm border-gray-200">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rando">Rando</SelectItem>
              <SelectItem value="Vélo">Vélo</SelectItem>
              <SelectItem value="Moto">Moto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
            Zone
          </label>
          <Input
            value={zone}
            onChange={(e) => onZoneChange(e.target.value)}
            placeholder="Ex: Occitanie"
            className="h-10 text-sm bg-white border-gray-200"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
            Régime
          </label>
          <Input
            value={diet}
            onChange={(e) => onDietChange(e.target.value)}
            placeholder="Ex: Végétarien"
            className="h-10 text-sm bg-white border-gray-200"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
            Spécialité
          </label>
          <Input
            value={speciality}
            onChange={(e) => onSpecialityChange(e.target.value)}
            placeholder="Ex: Cassoulet"
            className="h-10 text-sm bg-white border-gray-200"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          Anecdote (Faits)
        </label>
        <Textarea
          value={facts}
          onChange={(e) => onFactsChange(e.target.value)}
          placeholder="Petite histoire..."
          className="h-20 text-sm resize-none bg-white border-gray-200"
        />
      </div>

      {/* Submit Button */}
      <Button
        className="w-full py-6 text-lg rounded-full font-bold shadow-lg bg-secondary hover:bg-secondary/90 text-white transition-transform active:scale-[0.98]"
        onClick={onSubmit}
        disabled={isSubmitting || steps < 2 || !title}
      >
        {isSubmitting ? "Création..." : "Créer l'itinéraire"}
      </Button>
    </section>
  );
}
