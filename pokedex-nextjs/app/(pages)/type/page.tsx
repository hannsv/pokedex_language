"use client";

import { useState } from "react";
import { pokemonTypes, typeStyleMap } from "@/app/lib/api/pokemonTypes";
import TypeMatchup from "@/app/_components/pokemon/detail/TypeMatchup";
import TypeCard from "@/app/_components/pokemon/type/TypeCard";

export default function TypeCalculatorPage() {
  const [type1, setType1] = useState<string | null>(null);
  const [type2, setType2] = useState<string | null>(null);

  const handleTypeSelect = (type: string, slot: 1 | 2) => {
    if (slot === 1) {
      if (type1 === type) {
        setType1(null); // Toggle off
      } else {
        setType1(type);
        // If type2 is same as new type1, clear type2
        if (type2 === type) {
          setType2(null);
        }
      }
    } else {
      if (type2 === type) {
        setType2(null); // Toggle off
      } else {
        // Prevent selecting same type as type1
        if (type1 !== type) {
          setType2(type);
        }
      }
    }
  };

  const resetTypes = () => {
    setType1(null);
    setType2(null);
  };

  const selectedTypes = [type1, type2].filter((t): t is string => t !== null);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
        타입 상성 계산기
      </h1>
      <p className="text-center text-gray-500 mb-8">
        포켓몬의 타입을 1개 또는 2개 선택하여 방어/공격 상성을 확인하세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Type 1 Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">타입 1 (필수)</h2>
            {type1 && <TypeCard typeNames={type1} size="medium" />}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {pokemonTypes.map((t) => {
              const isSelected = type1 === t.en;
              const isDisabled = type2 === t.en;
              const style = typeStyleMap[t.en];

              return (
                <button
                  key={`t1-${t.en}`}
                  onClick={() => handleTypeSelect(t.en, 1)}
                  disabled={isDisabled}
                  className={`
                    py-2 px-1 rounded-md text-xs sm:text-sm font-bold transition-all
                    ${
                      isSelected
                        ? `${style.bg} ${style.text} ring-2 ring-offset-1 ring-gray-400 scale-105`
                        : isDisabled
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Type 2 Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">타입 2 (선택)</h2>
            {type2 ? (
              <TypeCard typeNames={type2} size="medium" />
            ) : (
              <span className="text-sm text-gray-400">선택 안함</span>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {pokemonTypes.map((t) => {
              const isSelected = type2 === t.en;
              const isDisabled = type1 === t.en;
              const style = typeStyleMap[t.en];

              return (
                <button
                  key={`t2-${t.en}`}
                  onClick={() => handleTypeSelect(t.en, 2)}
                  disabled={isDisabled}
                  className={`
                    py-2 px-1 rounded-md text-xs sm:text-sm font-bold transition-all
                    ${
                      isSelected
                        ? `${style.bg} ${style.text} ring-2 ring-offset-1 ring-gray-400 scale-105`
                        : isDisabled
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={resetTypes}
          disabled={selectedTypes.length === 0}
          className={`
            px-6 py-2 rounded-full font-bold transition-colors
            ${
              selectedTypes.length > 0
                ? "bg-red-500 text-white hover:bg-red-600 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          초기화
        </button>
      </div>

      {/* Result Section */}
      {selectedTypes.length > 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">결과 분석</h2>
            <div className="flex gap-2 ml-4">
              {selectedTypes.map((t) => (
                <TypeCard key={`res-${t}`} typeNames={t} size="medium" />
              ))}
            </div>
          </div>

          {/* Reusing the TypeMatchup component */}
          <TypeMatchup types={selectedTypes} />
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">
            타입을 선택하면 상성 분석 결과가 여기에 표시됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
