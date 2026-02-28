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
            <DrawerTitle>Détails de l'étape</DrawerTitle>
            <DrawerDescription>
              Ajouter des informations sur ce point de l'itinéraire.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0 space-y-4 overflow-y-auto max-h-[50vh]">
            <div className="space-y-2">
              <Typography variant="label">Nom de l'étape *</Typography>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Pause déjeuner"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="label">Description</Typography>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Une brève description..."
                className="resize-none h-20"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="label">URL d'une Photo</Typography>
              <Input
                type="url"
                placeholder="https://..."
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
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
              <div className="p-4 border border-secondary/30 rounded-lg bg-secondary/5 space-y-3 mt-2">
                <Typography
                  variant="label"
                  className="text-sm text-secondary block font-bold"
                >
                  Nouveau FoodPlace
                </Typography>
                <div className="space-y-2">
                  <Typography variant="label" className="text-xs">
                    Nom du lieu *
                  </Typography>
                  <Input
                    value={fpName}
                    onChange={(e) => setFpName(e.target.value)}
                    placeholder="Ex: Auberge du Lac"
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Typography variant="label" className="text-xs">
                    Type de cuisine
                  </Typography>
                  <Input
                    value={fpType}
                    onChange={(e) => setFpType(e.target.value)}
                    placeholder="Ex: Traditionnelle"
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Typography variant="label" className="text-xs">
                    Description
                  </Typography>
                  <Textarea
                    value={fpDesc}
                    onChange={(e) => setFpDesc(e.target.value)}
                    placeholder="..."
                    className="h-16 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          <DrawerFooter>
            <Button
              onClick={handleSave}
              disabled={isSubmitting || !name || (hasFoodPlace && !fpName)}
              className="bg-primary text-white"
            >
              {isSubmitting ? "Validation..." : "Valider l'étape"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
