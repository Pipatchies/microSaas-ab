"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/typography";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      await login(values);
      toast.success("Connexion réussie !");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Identifiants invalides");

      // If the error looks like a field error, we can set it on the form
      if (error.message.toLowerCase().includes("email")) {
        form.setError("email", { message: error.message });
      } else if (error.message.toLowerCase().includes("password")) {
        form.setError("password", { message: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <Typography variant="p" className="text-zinc-500">
          Connectez-vous à votre compte
        </Typography>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nom@exemple.com"
                    type="email"
                    {...field}
                    className="h-12 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    {...field}
                    className="h-12 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 rounded-xl shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Typography variant="small">
          Pas encore de compte ?{" "}
          <Typography variant="a" href="/register">
            S'inscrire
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
