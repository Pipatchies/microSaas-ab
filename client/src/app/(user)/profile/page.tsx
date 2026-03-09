"use client";

import { useAuth } from "@/contexts/AuthContext";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Typography variant="p">Chargement...</Typography>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Typography variant="h2">Non connecté</Typography>
        <Typography variant="p">
          Veuillez vous connecter pour accéder à votre profil.
        </Typography>
        <Button onClick={() => (window.location.href = "/login")}>
          Se connecter
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-24 pb-32 px-4 max-w-md">
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader className="bg-primary text-accent pt-10 pb-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <User size={40} className="text-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold">Mon Espace</CardTitle>
          <Typography variant="p" className="text-accent/80 opacity-90">
            {user.email}
          </Typography>
        </CardHeader>

        <CardContent className="pt-8 pb-8 space-y-6">
          <div className="space-y-4">
            <Typography
              variant="h4"
              className="text-primary font-semibold border-b pb-2"
            >
              Informations personnelles
            </Typography>
            <div className="space-y-1">
              <Typography variant="small" className="text-zinc-400">
                Email
              </Typography>
              <Typography variant="p" className="font-medium">
                {user.email}
              </Typography>
            </div>
            {user.first_name && (
              <div className="space-y-1">
                <Typography variant="small" className="text-zinc-400">
                  Prénom
                </Typography>
                <Typography variant="p" className="font-medium">
                  {user.first_name}
                </Typography>
              </div>
            )}
          </div>

          <Button
            variant="destructive"
            className="w-full h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-destructive/10 transition-all hover:shadow-destructive/20 active:scale-95"
            onClick={logout}
          >
            <LogOut size={18} />
            Se déconnecter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
