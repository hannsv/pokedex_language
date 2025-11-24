"use client";

import React, { useEffect, useState } from "react";
import TypeCard from "../type/TypeCard";
import { pokemonTypes } from "@/app/lib/api/pokemonTypes";

interface TypeMatchupProps {
  types: string[];
}

interface DamageRelations {
  double_damage_from: { name: string; url: string }[];
  double_damage_to: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  half_damage_to: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
  no_damage_to: { name: string; url: string }[];
}

interface TypeData {
  name: string;
  relations: DamageRelations;
}

export default function TypeMatchup({ types }: TypeMatchupProps) {
  const [defenseEffectiveness, setDefenseEffectiveness] = useState<
    Record<string, number>
  >({});
  const [attackEffectiveness, setAttackEffectiveness] = useState<TypeData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateEffectiveness = async () => {
      setIsLoading(true);

      // Initialize all types with 1x effectiveness for defense
      const typeMultipliers: Record<string, number> = {};
      pokemonTypes.forEach((t) => {
        typeMultipliers[t.en] = 1;
      });

      try {
        // Fetch data for each type of the pokemon
        const promises = types.map((type) =>
          fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) =>
            res.json()
          )
        );

        const results = await Promise.all(promises);
        const attackData: TypeData[] = [];

        results.forEach(
          (data: { name: string; damage_relations: DamageRelations }) => {
            const relations = data.damage_relations;

            // Calculate Defense (Incoming Damage)
            relations.double_damage_from.forEach((t) => {
              if (typeMultipliers[t.name] !== undefined) {
                typeMultipliers[t.name] *= 2;
              }
            });

            relations.half_damage_from.forEach((t) => {
              if (typeMultipliers[t.name] !== undefined) {
                typeMultipliers[t.name] *= 0.5;
              }
            });

            relations.no_damage_from.forEach((t) => {
              if (typeMultipliers[t.name] !== undefined) {
                typeMultipliers[t.name] *= 0;
              }
            });

            // Store Attack Data (Outgoing Damage)
            attackData.push({
              name: data.name,
              relations: relations,
            });
          }
        );

        setDefenseEffectiveness(typeMultipliers);
        setAttackEffectiveness(attackData);
      } catch (error) {
        console.error("Failed to fetch type effectiveness:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (types.length > 0) {
      calculateEffectiveness();
    }
  }, [types]);

  if (isLoading) {
    return <div className="w-full p-4 text-center">타입 상성 로딩 중...</div>;
  }

  // --- Defense Logic ---
  const groupedByMultiplier: Record<number, string[]> = {};
  Object.entries(defenseEffectiveness).forEach(([type, multiplier]) => {
    if (multiplier !== 1) {
      if (!groupedByMultiplier[multiplier]) {
        groupedByMultiplier[multiplier] = [];
      }
      groupedByMultiplier[multiplier].push(type);
    }
  });

  const sortedMultipliers = Object.keys(groupedByMultiplier)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-bold mb-3 text-gray-700 border-b pb-2">
        타입 상성
      </h2>

      {/* Defense Section */}
      <div className="mb-6">
        <h3 className="font-bold text-md mb-3 text-gray-800 flex items-center">
          <span className="w-1 h-4 bg-blue-500 mr-2 rounded-full"></span>
          방어 상성 (받는 피해)
        </h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {sortedMultipliers.length === 0 ? (
            <p className="text-gray-500 text-sm">
              특이 사항 없음 (모든 타입 1배)
            </p>
          ) : (
            <div className="space-y-3">
              {sortedMultipliers.map((multiplier) => (
                <div
                  key={multiplier}
                  className="flex flex-col sm:flex-row sm:items-center gap-2"
                >
                  <div className="w-16 shrink-0 font-semibold text-sm text-gray-600">
                    {multiplier}배
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {groupedByMultiplier[multiplier].map((type) => (
                      <TypeCard key={type} typeNames={type} size="small" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Attack Section */}
      <div>
        <h3 className="font-bold text-md mb-3 text-gray-800 flex items-center">
          <span className="w-1 h-4 bg-red-500 mr-2 rounded-full"></span>
          공격 상성 (주는 피해)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attackEffectiveness.map((typeData) => (
            <div
              key={typeData.name}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2 border-b pb-2">
                <TypeCard typeNames={typeData.name} size="small" />
                <span className="text-sm font-medium text-gray-600">
                  타입 공격 시
                </span>
              </div>

              <div className="space-y-3">
                {/* 2x Damage */}
                {typeData.relations.double_damage_to.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">
                      2배 (효과가 굉장함)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {typeData.relations.double_damage_to.map((t) => (
                        <TypeCard
                          key={t.name}
                          typeNames={t.name}
                          size="small"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 0.5x Damage */}
                {typeData.relations.half_damage_to.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">
                      0.5배 (효과가 별로)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {typeData.relations.half_damage_to.map((t) => (
                        <TypeCard
                          key={t.name}
                          typeNames={t.name}
                          size="small"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 0x Damage */}
                {typeData.relations.no_damage_to.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">
                      0배 (효과 없음)
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {typeData.relations.no_damage_to.map((t) => (
                        <TypeCard
                          key={t.name}
                          typeNames={t.name}
                          size="small"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {typeData.relations.double_damage_to.length === 0 &&
                  typeData.relations.half_damage_to.length === 0 &&
                  typeData.relations.no_damage_to.length === 0 && (
                    <p className="text-gray-400 text-xs">특이 사항 없음</p>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
