"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ItinerariesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Itineraries error:", error);
  }, [error]);

  const isNetworkError =
    error.message.toLowerCase().includes("fetch") ||
    error.message.toLowerCase().includes("failed") ||
    error.message.toLowerCase().includes("network");

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-8 text-center">
      <div className="text-4xl">🌐</div>
      <h2 className="text-xl font-semibold text-gray-800">
        {isNetworkError
          ? "L'API est temporairement indisponible"
          : "Une erreur est survenue"}
      </h2>
      <p className="text-gray-500 max-w-md">
        {isNetworkError
          ? "Impossible de contacter le serveur. Vérifiez votre connexion ou réessayez dans quelques instants."
          : error.message}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
