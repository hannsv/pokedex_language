"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { pokemonTypes, typeStyleMap } from "../../../lib/api/pokemonTypes";

interface TypeCardProps {
  typeNames: string;
  size?: "small" | "medium";
  lang?: "ko" | "en" | "zh";
}

export default function TypeCard({
  typeNames,
  size = "medium",
  lang = "ko",
}: TypeCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { bg, text } = typeStyleMap[typeNames] || {
    bg: "bg-gray-300",
    text: "text-black",
  };

  const typeInfo = pokemonTypes.find((t) => t.en === typeNames);
  let displayName = typeNames;

  if (typeInfo) {
    if (lang === "ko") displayName = typeInfo.name;
    else if (lang === "zh") displayName = typeInfo.zh || typeInfo.name;
    else displayName = typeNames.charAt(0).toUpperCase() + typeNames.slice(1);
  } else {
    displayName = typeNames.charAt(0).toUpperCase() + typeNames.slice(1);
  }

  const sizeClasses =
    size === "small" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-sm";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Save filter to session storage
    // Note: The list page uses "pokemon_list_types" (array) now, not "pokemon_list_type" (string).
    // We should update this to match the new filter logic if possible, or just redirect.
    // For now, let's just redirect and let the user filter there, or update the storage correctly.
    // The new list page expects JSON array in "pokemon_list_types".
    sessionStorage.setItem("pokemon_list_types", JSON.stringify([typeNames]));
    sessionStorage.setItem("pokemon_list_count", "20");
    sessionStorage.setItem("pokemon_scroll_pos", "0");

    // If we are on the pokemon list page, force a reload to apply the new filter
    if (pathname === `/${lang}/pokemon`) {
      window.location.reload();
    } else {
      router.push(`/${lang}/pokemon`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${sizeClasses} rounded-full ${bg} ${text} font-bold shadow-sm whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity`}
    >
      {displayName}
    </div>
  );
}
