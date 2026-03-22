"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/typography";
import type { FoodPlace } from "@/types/itinerary";
import { CtaButton } from "@/components/cta-button";

export interface StepDrawerData {
  name: string;
  description: string;
  picture?: string | File;
  foodplace?: Omit<FoodPlace, "id_foodplace">;
}

interface StepDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: StepDrawerData) => void;
  defaultStepName?: string;
  isSubmitting?: boolean;
}

const stepDrawerSchema = z
  .object({
    name: z.string().min(1, "Le nom de l'étape est requis"),
    description: z.string().optional(),
    pictureFile: z.any().optional(),
    hasFoodPlace: z.boolean(),
    fpName: z.string().optional(),
    fpType: z.string().optional(),
    fpDesc: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.hasFoodPlace ||
      (data.hasFoodPlace && data.fpName && data.fpName.length > 0),
    {
      message: "Le nom du lieu est requis si un lieu de restauration est lié",
      path: ["fpName"],
    },
  );

type StepDrawerFormValues = z.infer<typeof stepDrawerSchema>;

export default function StepDrawer({
  isOpen,
  onOpenChange,
  onSave,
  defaultStepName = "Nouvelle Étape",
  isSubmitting = false,
}: StepDrawerProps) {
  const methods = useForm<StepDrawerFormValues>({
    resolver: zodResolver(stepDrawerSchema),
    defaultValues: {
      name: defaultStepName,
      description: "",
      pictureFile: undefined,
      hasFoodPlace: false,
      fpName: "",
      fpType: "",
      fpDesc: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = methods;

  const hasFoodPlace = watch("hasFoodPlace");

  useEffect(() => {
    if (isOpen) {
      reset({
        name: defaultStepName,
        description: "",
        pictureFile: undefined,
        hasFoodPlace: false,
        fpName: "",
        fpType: "",
        fpDesc: "",
      });
    }
  }, [isOpen, defaultStepName, reset]);

  const onSubmit = (data: StepDrawerFormValues) => {
    onSave({
      name: data.name,
      description: data.description || "",
      picture: data.pictureFile || undefined,
      foodplace: data.hasFoodPlace
        ? {
            name: data.fpName || "",
            type: data.fpType || "",
            description: data.fpDesc || "",
            longitude: 0,
            latitude: 0,
          }
        : undefined,
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-sm"
          >
            <DrawerHeader>
              <DrawerTitle>
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
                  {...register("name")}
                  placeholder="Ex: Pause déjeuner"
                  className={`h-10 text-sm text-primary border-secondary focus-visible:ring-secondary/50 bg-accent ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Typography variant="label">Description</Typography>
                <Textarea
                  {...register("description")}
                  placeholder="Une brève description..."
                  className="resize-none h-20 text-sm text-primary border-secondary focus-visible:ring-secondary/50 bg-accent"
                />
              </div>

              <div className="space-y-2">
                <Typography variant="label">Photo (Optionnel)</Typography>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      methods.setValue("pictureFile", file);
                    } else {
                      methods.setValue("pictureFile", undefined);
                    }
                  }}
                  className={`h-10 text-sm text-primary border-secondary focus-visible:ring-secondary/50 bg-accent`}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="foodplace-check"
                  {...register("hasFoodPlace")}
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
                      {...register("fpName")}
                      placeholder="Ex: Auberge du Lac"
                      className={`h-9 text-sm text-primary border-primary focus-visible:ring-primary/50 bg-white ${errors.fpName ? "border-red-500" : ""}`}
                    />
                    {errors.fpName && (
                      <span className="text-red-500 text-xs">
                        {errors.fpName.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Typography
                      variant="label"
                      className="text-sm text-foreground"
                    >
                      Type de cuisine
                    </Typography>
                    <Input
                      {...register("fpType")}
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
                      {...register("fpDesc")}
                      placeholder="..."
                      className="h-16 resize-none text-sm text-primary border-primary focus-visible:ring-primary/50 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <DrawerFooter>
              <CtaButton
                type="submit"
                disabled={isSubmitting || !isValid}
                text={isSubmitting ? "Validation..." : "Valider l'étape"}
              />
              <DrawerClose asChild>
                <CtaButton type="button" ctaVariant="outline" text="Annuler" />
              </DrawerClose>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}
