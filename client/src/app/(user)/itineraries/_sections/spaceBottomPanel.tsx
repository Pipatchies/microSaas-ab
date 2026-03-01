"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Route, Clock, MapPin, MapPinned, UtensilsCrossed } from "lucide-react";
import Typography from "@/components/typography";
import { StepList } from "@/components/step-list";
import type { ItineraryFormValues } from "../components/itinerary-form";
import type { StepDrawerData } from "../components/step-drawer";
import { CtaButton } from "@/components/cta-button";

interface ItineraryBottomPanelProps {
  distance: number;
  duration: number;
  steps: number;
  waypoints: (StepDrawerData & { lng: number; lat: number })[];
  onTypeChangeMap: (value: string) => void;
}

export default function ItineraryBottomPanel({
  distance,
  duration,
  steps,
  waypoints,
  onTypeChangeMap,
}: ItineraryBottomPanelProps) {
  const {
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<ItineraryFormValues>();

  const titleValue = watch("title");

  // Format duration
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <section className="bg-transparent p-5 md:p-8 space-y-5 md:space-y-8">
      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <Typography
          variant="h4"
          className="text-xl font-medium text-foreground block"
        >
          Titre de l'itinéraire
        </Typography>
        <Input
          {...register("title")}
          placeholder=""
          data-testid="itinerary-title-input"
          className={`text-lg text-foreground font-medium border-secondary border-2 h-11 focus-visible:ring-secondary/50 bg-white ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
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
        <div className="flex flex-col justify-end">
          <Typography
            variant="label"
            className="text-sm font-semibold text-foreground mb-1.5 block"
          >
            Moyen de transport
          </Typography>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  onTypeChangeMap(val);
                }}
              >
                <SelectTrigger
                  data-testid="itinerary-type-select"
                  className="w-full bg-white h-10 text-sm border-secondary"
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="border-secondary">
                  <SelectItem value="Rando">Rando</SelectItem>
                  <SelectItem value="Vélo">Vélo</SelectItem>
                  <SelectItem value="Moto">Moto</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col justify-end">
          <Typography
            variant="label"
            className="text-sm font-semibold text-foreground mb-1.5 block"
          >
            Zone
          </Typography>
          <Input
            {...register("zone")}
            data-testid="itinerary-zone-input"
            placeholder="Ex: Occitanie"
            className="h-10 text-sm bg-white border-secondary"
          />
        </div>
        <div className="flex flex-col justify-end">
          <Typography
            variant="label"
            className="text-sm font-semibold text-foreground mb-1.5 block"
          >
            Régime
          </Typography>
          <Input
            {...register("diet")}
            data-testid="itinerary-diet-input"
            placeholder="Ex: Végétarien"
            className="h-10 text-sm bg-white border-secondary"
          />
        </div>
        <div className="flex flex-col justify-end">
          <Typography
            variant="label"
            className="text-sm font-semibold text-foreground mb-1.5 block"
          >
            Spécialité
          </Typography>
          <Input
            {...register("speciality")}
            data-testid="itinerary-speciality-input"
            placeholder="Ex: Cassoulet"
            className="h-10 text-sm bg-white border-secondary"
          />
        </div>
      </div>

      <div>
        <Typography
          variant="label"
          className="text-sm font-semibold text-foreground mb-1.5 block"
        >
          Anecdote (Faits)
        </Typography>
        <Textarea
          {...register("facts")}
          data-testid="itinerary-facts-textarea"
          placeholder="Petite histoire..."
          className="h-20 text-sm resize-none bg-white border-secondary"
        />
      </div>

      {waypoints.length > 0 && <StepList steps={waypoints} />}

      {/* Submit Button */}
      <div className="flex justify-center">
        <CtaButton
          type="submit"
          data-testid="itinerary-submit-button"
          text={isSubmitting ? "Création..." : "Créer l'itinéraire"}
          disabled={isSubmitting || steps < 2 || !titleValue}
          ctaVariant="solid"
        />
      </div>
    </section>
  );
}
