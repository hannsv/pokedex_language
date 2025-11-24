"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { pokemonTypes, typeStyleMap } from "../../../lib/api/pokemonTypes";

interface TypeCardProps {
  typeNames: string;
  size?: "small" | "medium";
}

export default function TypeCard({
  typeNames,
  size = "medium",
}: TypeCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { bg, text } = typeStyleMap[typeNames] || {
    bg: "bg-gray-300",
    text: "text-black",
  };

  const koreanName =
    pokemonTypes.find((t) => t.en === typeNames)?.name || typeNames;

  const sizeClasses =
    size === "small" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-sm";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Save filter to session storage
    sessionStorage.setItem("pokemon_list_type", typeNames);
    sessionStorage.setItem("pokemon_list_count", "20");
    sessionStorage.setItem("pokemon_scroll_pos", "0");

    // If we are on the pokemon list page, force a reload to apply the new filter
    if (pathname === "/pokemon") {
      window.location.reload();
    } else {
      router.push("/pokemon");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${sizeClasses} rounded-full ${bg} ${text} font-bold shadow-sm whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity`}
    >
      {koreanName}
    </div>
  );
}
