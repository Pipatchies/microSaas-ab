"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { CtaButton } from "@/components/cta-button";

const filterOptions = [
  {
    id: "Rando",
    label: "Je suis un randonneur",
    imageSrc: "/images/rando.png",
  },
  {
    id: "Vélo",
    label: "Je suis un cycliste",
    imageSrc: "/images/velo.png",
  },
  {
    id: "Moto",
    label: "Je suis un motard",
    imageSrc: "/images/moto.png",
  },
];

export function FilterCards() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/itineraries?type=${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-10xl mx-auto px-6">
      {filterOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => handleSelect(option.id)}
          className="relative w-full aspect-[1.33] md:aspect-video rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group bg-transparent"
        >
          <Image
            src={option.imageSrc}
            alt={option.label}
            width={800}
            height={600}
            className="w-full h-full object-cover scale-[1.10] transition-transform duration-700 group-hover:scale-[1.15]"
            priority
          />
          {/* Overlay CTA Button */}
          <div className="absolute top-6 right-6">
            <CtaButton
              text={option.label}
              iconLeft={ArrowUp}
              ctaVariant="solid"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
