"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/typography";
import type { FoodPlace } from "@/types/itinerary";
import { CtaButton } from "@/components/cta-button";

export interface StepDrawerData {
  name: string;
  description: string;
  picture?: string;
  foodplace?: Omit<FoodPlace, "id_foodplace">;
}

interface StepDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: StepDrawerData) => void;
  defaultStepName?: string;
  isSubmitting?: boolean;
}

export default function StepDrawer({
  isOpen,
  onOpenChange,
  onSave,
  defaultStepName = "Nouvelle Étape",
  isSubmitting = false,
}: StepDrawerProps) {
  const [name, setName] = useState(defaultStepName);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  // FoodPlace fields
  const [hasFoodPlace, setHasFoodPlace] = useState(false);
  const [fpName, setFpName] = useState("");
  const [fpType, setFpType] = useState("");
  const [fpDesc, setFpDesc] = useState("");

  // Update default name when it changes (for example new step index)
  useEffect(() => {
    if (isOpen) {
      setName(defaultStepName);
      setDescription("");
      setPicture("");
      setHasFoodPlace(false);
      setFpName("");
      setFpType("");
      setFpDesc("");
    }
  }, [isOpen, defaultStepName]);

  const handleSave = () => {
    onSave({
      name,
      description,
      picture: picture || undefined,
      foodplace: hasFoodPlace
        ? {
            name: fpName,
            type: fpType,
            description: fpDesc,
            longitude: 0, // Will be filled with Step's lng/lat later
            latitude: 0,
          }
        : undefined,
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {" "}
              <Typography variant="h2">Details de l'etape</Typography>
            </DrawerTitle>
            <DrawerDescription className="text-foreground">
              Ajouter des informations sur ce point de l'itinéraire.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0 space-y-4 overflow-y-auto max-h-[50vh]">
            <div className="space-y-2">
              <Typography variant="label">Nom de l'étape*</Typography>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Pause déjeuner"
                className="h-10 text-sm text-primary border-secondary focus-visible:ring-secondary/50 bg-accent"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="label">Description</Typography>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Une brève description..."
                className="resize-none h-20 text-sm text-primary border-secondary focus-visible:ring-secondary/50 bg-accent"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="label">Photo</Typography>
              <Input
                type="url"
                placeholder="https://..."
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className="h-10 text-sm text-primary border-secondary focus-visible:ring-secondary/50 bg-accent"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="foodplace-check"
                checked={hasFoodPlace}
                onChange={(e) => setHasFoodPlace(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="foodplace-check"
                className="text-sm font-semibold leading-none cursor-pointer"
              >
                Lier un lieu de restauration (FoodPlace)
              </label>
            </div>

            {hasFoodPlace && (
              <div className="p-4 border border-primary rounded-lg bg-accent space-y-3 mt-2">
                <Typography
                  variant="h4"
                  className="text-sm text-primary block font-bold"
                >
                  Nouveau FoodPlace
                </Typography>
                <div className="space-y-2">
                  <Typography
                    variant="label"
                    className="text-sm text-foreground"
                  >
                    Nom du lieu*
                  </Typography>
                  <Input
                    value={fpName}
                    onChange={(e) => setFpName(e.target.value)}
                    placeholder="Ex: Auberge du Lac"
                    className="h-9 text-sm text-primary border-primary focus-visible:ring-primary/50 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Typography
                    variant="label"
                    className="text-sm text-foreground"
                  >
                    Type de cuisine
                  </Typography>
                  <Input
                    value={fpType}
                    onChange={(e) => setFpType(e.target.value)}
                    placeholder="Ex: Traditionnelle"
                    className="h-9 text-sm text-primary border-primary focus-visible:ring-primary/50 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Typography
                    variant="label"
                    className="text-sm text-foreground"
                  >
                    Description
                  </Typography>
                  <Textarea
                    value={fpDesc}
                    onChange={(e) => setFpDesc(e.target.value)}
                    placeholder="..."
                    className="h-16 resize-none text-sm text-primary border-primary focus-visible:ring-primary/50 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          <DrawerFooter>
            <CtaButton
              onClick={handleSave}
              disabled={isSubmitting || !name || (hasFoodPlace && !fpName)}
              text={isSubmitting ? "Validation..." : "Valider l'étape"}
            />
            <DrawerClose asChild>
              <CtaButton ctaVariant="outline" text="Annuler" />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
