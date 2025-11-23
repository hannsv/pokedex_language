"use client";

interface DropDownFilterProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function DropDownFilter({
  selectedType,
  onSelectType,
}: DropDownFilterProps) {
  const typeKorean = [
    { type: "all", korean: "전체" },
    { type: "normal", korean: "노말" },
    { type: "fighting", korean: "격투" },
    { type: "flying", korean: "비행" },
    { type: "poison", korean: "독" },
    { type: "ground", korean: "땅" },
    { type: "rock", korean: "바위" },
    { type: "bug", korean: "벌레" },
    { type: "ghost", korean: "고스트" },
    { type: "steel", korean: "강철" },
    { type: "fire", korean: "불꽃" },
    { type: "water", korean: "물" },
    { type: "grass", korean: "풀" },
    { type: "electric", korean: "전기" },
    { type: "psychic", korean: "에스퍼" },
    { type: "ice", korean: "얼음" },
    { type: "dragon", korean: "드래곤" },
    { type: "dark", korean: "악" },
    { type: "fairy", korean: "페어리" },
  ];

  return (
    <div className="w-full mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-sm">타입 필터</span>
      </div>
      <ul className="flex flex-wrap gap-2 justify-center">
        {typeKorean.map((type) => (
          <li
            key={type.type}
            onClick={() => onSelectType(type.type)}
            className={`cursor-pointer px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedType === type.type
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {type.korean}
          </li>
        ))}
      </ul>
    </div>
  );
}
