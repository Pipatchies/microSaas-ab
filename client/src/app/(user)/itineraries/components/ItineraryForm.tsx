"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { itineraryService } from "../services/itineraryService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/typography";

// Schema Definitions
const itinerarySchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  type: z.string().min(1, "Le type est requis"),
  zone: z.string().min(1, "La zone est requise"),
  distance: z.number().min(1, "La distance doit être supérieure à 0"),
  diet: z.string().min(1, "Le régime alimentaire est requis"),
  speciality: z.string().min(1, "La spécialité est requise"),
  facts: z.string().optional(),
});

type ItineraryFormData = z.infer<typeof itinerarySchema>;

const defaultValues = {
  title: "",
  type: "",
  zone: "",
  distance: 0,
  diet: "",
  speciality: "",
  facts: "",
};

export default function ItineraryForm() {
  const router = useRouter();

  const form = useForm<ItineraryFormData>({
    resolver: zodResolver(itinerarySchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: ItineraryFormData) {
    try {
      await itineraryService.create(data);
      toast.success("Itinéraire créé avec succès !"); // Notification Shadcn
      router.push("/itineraries");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de la création."); // Notification Shadcn
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100"
      >
        <Typography
          variant="h2"
          className="text-2xl font-heading text-primary mb-6"
        >
          Ajouter un itinéraire
        </Typography>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Saveurs d'Occitanie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Vélo">Vélo</SelectItem>
                    <SelectItem value="Moto">Moto</SelectItem>
                    <SelectItem value="Rando">Rando</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zone */}
          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Occitanie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Distance */}
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (km)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Diet */}
          <FormField
            control={form.control}
            name="diet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Régime</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Viande, Végétarien" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Speciality */}
          <FormField
            control={form.control}
            name="speciality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spécialité</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Cassoulet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Facts */}
        <FormField
          control={form.control}
          name="facts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faits intéressants</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Petite anecdote..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création..." : "Créer l'itinéraire"}
        </Button>
      </form>
    </Form>
  );
}
