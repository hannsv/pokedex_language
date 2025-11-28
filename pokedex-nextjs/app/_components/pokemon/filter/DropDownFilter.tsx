"use client";

import { useState } from "react";
import { typeStyleMap } from "@/app/lib/api/pokemonTypes";

interface DropDownFilterProps {
  selectedTypes: string[];
  onSelectType: (type: string) => void;
  selectedForm: string;
  onSelectForm: (form: string) => void;
  isShiny: boolean;
  onToggleShiny: () => void;
  sortOrder: "asc" | "desc";
  onToggleSortOrder: () => void;
  dict: any;
}

export default function DropDownFilter({
  selectedTypes,
  onSelectType,
  selectedForm,
  onSelectForm,
  isShiny,
  onToggleShiny,
  sortOrder,
  onToggleSortOrder,
  dict,
}: DropDownFilterProps) {
  const [activeModal, setActiveModal] = useState<"none" | "type" | "form">(
    "none"
  );

  const typeKorean = [
    { type: "all", korean: dict?.filter?.all || "전체" },
    { type: "normal", korean: dict?.filter?.normal || "노말" },
    { type: "fighting", korean: dict?.filter?.fighting || "격투" },
    { type: "flying", korean: dict?.filter?.flying || "비행" },
    { type: "poison", korean: dict?.filter?.poison || "독" },
    { type: "ground", korean: dict?.filter?.ground || "땅" },
    { type: "rock", korean: dict?.filter?.rock || "바위" },
    { type: "bug", korean: dict?.filter?.bug || "벌레" },
    { type: "ghost", korean: dict?.filter?.ghost || "고스트" },
    { type: "steel", korean: dict?.filter?.steel || "강철" },
    { type: "fire", korean: dict?.filter?.fire || "불꽃" },
    { type: "water", korean: dict?.filter?.water || "물" },
    { type: "grass", korean: dict?.filter?.grass || "풀" },
    { type: "electric", korean: dict?.filter?.electric || "전기" },
    { type: "psychic", korean: dict?.filter?.psychic || "에스퍼" },
    { type: "ice", korean: dict?.filter?.ice || "얼음" },
    { type: "dragon", korean: dict?.filter?.dragon || "드래곤" },
    { type: "dark", korean: dict?.filter?.dark || "악" },
    { type: "fairy", korean: dict?.filter?.fairy || "페어리" },
  ];

  const formKorean = [
    { type: "all", korean: dict?.filter?.default || "기본" },
    { type: "mega", korean: dict?.filter?.mega || "메가진화" },
    { type: "gmax", korean: dict?.filter?.gmax || "거다이맥스" },
    { type: "alola", korean: dict?.filter?.alola || "알로라" },
    { type: "galar", korean: dict?.filter?.galar || "가라르" },
    { type: "hisui", korean: dict?.filter?.hisui || "히스이" },
    { type: "paldea", korean: dict?.filter?.paldea || "팔데아" },
  ];

  return (
    <>
      {/* Desktop View (Hidden on Mobile) */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8 w-full mb-4">
        {/* 타입 필터 (Left 50%) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <span className="font-bold text-xs text-gray-500 dark:text-gray-400">
              {dict?.filter?.type || "타입"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={onToggleSortOrder}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all border ${
                  sortOrder === "desc"
                    ? "bg-red-100 text-red-700 border-red-300 dark:bg-[#333] dark:text-red-400 dark:border-red-400"
                    : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100 dark:bg-[#1E1E1E] dark:text-gray-500 dark:border-gray-700 dark:hover:bg-[#333]"
                }`}
              >
                <span
                  className={
                    sortOrder === "desc"
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-300 dark:text-gray-600"
                  }
                >
                  {sortOrder === "desc" ? "▼" : "▲"}
                </span>
                {sortOrder === "desc"
                  ? dict?.filter?.sort_desc || "역순 정렬"
                  : dict?.filter?.sort_asc || "번호순"}
              </button>
              <button
                onClick={onToggleShiny}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all border ${
                  isShiny
                    ? "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-[#333] dark:text-[#FFD700] dark:border-[#FFD700]"
                    : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100 dark:bg-[#1E1E1E] dark:text-gray-500 dark:border-gray-700 dark:hover:bg-[#333]"
                }`}
              >
                <span
                  className={
                    isShiny
                      ? "text-yellow-500 dark:text-[#FFD700]"
                      : "text-gray-300 dark:text-gray-600"
                  }
                >
                  ✨
                </span>
                {dict?.filter?.shiny || "이로치 모드"}
              </button>
            </div>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {typeKorean.map((type) => {
              const isSelected =
                type.type === "all"
                  ? selectedTypes.length === 0
                  : selectedTypes.includes(type.type);

              let selectedStyle =
                "bg-blue-500 text-white border-blue-500 shadow-sm font-bold dark:bg-blue-700 dark:border-blue-500";
              if (
                isSelected &&
                type.type !== "all" &&
                typeStyleMap[type.type]
              ) {
                const style = typeStyleMap[type.type];
                selectedStyle = `${style.bg} ${style.text} border-transparent shadow-sm font-bold`;
              }

              return (
                <li
                  key={type.type}
                  onClick={() => onSelectType(type.type)}
                  className={`cursor-pointer px-2.5 py-1 text-[11px] rounded-full border transition-all ${
                    isSelected
                      ? selectedStyle
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-[#1E1E1E] dark:text-[#EAEAEA] dark:border-gray-700 dark:hover:bg-[#333] dark:hover:border-[#FFD700]"
                  }`}
                >
                  {type.korean}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 폼 필터 (Right 50%) */}
        <div className="flex flex-col gap-2 border-l pl-8 border-gray-200 dark:border-gray-700">
          <span className="font-bold text-xs text-gray-500 dark:text-gray-400 px-1">
            {dict?.filter?.form || "폼"}
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {formKorean.map((form) => (
              <li
                key={form.type}
                onClick={() =>
                  onSelectForm(selectedForm === form.type ? "all" : form.type)
                }
                className={`cursor-pointer px-2.5 py-1 text-[11px] rounded-full border transition-all ${
                  selectedForm === form.type
                    ? "bg-purple-500 text-white border-purple-500 shadow-sm font-bold dark:bg-purple-700 dark:border-purple-500"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-[#1E1E1E] dark:text-[#EAEAEA] dark:border-gray-700 dark:hover:bg-[#333] dark:hover:border-[#FFD700]"
                }`}
              >
                {form.korean}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Floating Buttons */}
      <div className="md:hidden fixed bottom-6 left-4 z-40 flex flex-col gap-3">
        <button
          onClick={onToggleSortOrder}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform active:scale-95 ${
            sortOrder === "desc"
              ? "bg-red-500 text-white ring-2 ring-red-300 dark:bg-red-700 dark:ring-red-500"
              : "bg-white text-gray-400 border border-gray-200 dark:bg-[#1E1E1E] dark:text-gray-500 dark:border-gray-700"
          }`}
          title={dict?.filter?.sort_desc || "정렬 변경"}
        >
          <span className="text-xs font-bold">
            {sortOrder === "desc"
              ? dict?.filter?.sort_desc?.slice(0, 2) || "역순"
              : dict?.filter?.sort_asc?.slice(0, 2) || "번호"}
          </span>
        </button>
        <button
          onClick={onToggleShiny}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform active:scale-95 ${
            isShiny
              ? "bg-yellow-400 text-white ring-2 ring-yellow-200 dark:bg-[#FFD700] dark:text-black dark:ring-[#B8860B]"
              : "bg-white text-gray-400 border border-gray-200 dark:bg-[#1E1E1E] dark:text-gray-500 dark:border-gray-700"
          }`}
          title={dict?.filter?.shiny || "이로치 모드"}
        >
          <span className="text-lg">✨</span>
        </button>
        <button
          onClick={() => setActiveModal("type")}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform active:scale-95 ${
            selectedTypes.length > 0
              ? "bg-blue-500 text-white ring-2 ring-blue-300 dark:bg-blue-700 dark:ring-blue-500"
              : "bg-white text-gray-700 border border-gray-200 dark:bg-[#1E1E1E] dark:text-[#EAEAEA] dark:border-gray-700"
          }`}
          title={dict?.filter?.type || "타입 필터"}
        >
          <span className="text-xs font-bold">
            {dict?.filter?.type || "타입"}
          </span>
        </button>
        <button
          onClick={() => setActiveModal("form")}
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform active:scale-95 ${
            selectedForm !== "all"
              ? "bg-purple-500 text-white ring-2 ring-purple-300 dark:bg-purple-700 dark:ring-purple-500"
              : "bg-white text-gray-700 border border-gray-200 dark:bg-[#1E1E1E] dark:text-[#EAEAEA] dark:border-gray-700"
          }`}
          title={dict?.filter?.form || "폼 필터"}
        >
          <span className="text-xs font-bold">
            {dict?.filter?.form || "폼"}
          </span>
        </button>
      </div>

      {/* Mobile Modal Overlay */}
      {activeModal !== "none" && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-[#1E1E1E] dark:border dark:border-[#FFD700] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50 dark:bg-[#121212] dark:border-gray-800">
              <h3 className="font-bold text-lg text-gray-800 dark:text-[#EAEAEA]">
                {activeModal === "type"
                  ? dict?.filter?.select_type || "타입 선택"
                  : dict?.filter?.select_form || "폼 선택"}
              </h3>
              <a
                onClick={() => setActiveModal("none")}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:text-[#FFD700] dark:hover:bg-[#333] rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </a>
            </div>

            {/* Modal Content */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <ul className="flex flex-wrap gap-2 justify-center">
                {(activeModal === "type" ? typeKorean : formKorean).map(
                  (item) => {
                    const isSelected =
                      activeModal === "type"
                        ? item.type === "all"
                          ? selectedTypes.length === 0
                          : selectedTypes.includes(item.type)
                        : selectedForm === item.type;

                    let selectedStyle =
                      "bg-blue-500 text-white border-blue-500 font-bold shadow-md dark:bg-blue-700 dark:border-blue-500";

                    if (
                      activeModal === "type" &&
                      isSelected &&
                      item.type !== "all" &&
                      typeStyleMap[item.type]
                    ) {
                      const style = typeStyleMap[item.type];
                      selectedStyle = `${style.bg} ${style.text} border-transparent font-bold shadow-md`;
                    } else if (activeModal === "form" && isSelected) {
                      selectedStyle =
                        "bg-purple-500 text-white border-purple-500 font-bold shadow-md dark:bg-purple-700 dark:border-purple-500";
                    }

                    return (
                      <li
                        key={item.type}
                        onClick={() => {
                          if (activeModal === "type") {
                            onSelectType(item.type);
                          } else {
                            onSelectForm(
                              selectedForm === item.type ? "all" : item.type
                            );
                          }
                          setActiveModal("none");
                        }}
                        className={`cursor-pointer px-4 py-2 text-sm rounded-xl border transition-all w-full text-center ${
                          isSelected
                            ? selectedStyle
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-[#1E1E1E] dark:text-[#EAEAEA] dark:border-gray-700 dark:hover:bg-[#333] dark:hover:border-[#FFD700]"
                        }`}
                      >
                        {item.korean}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setActiveModal("none")}
          />
        </div>
      )}
    </>
  );
}
