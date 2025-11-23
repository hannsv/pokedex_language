"use client";

interface DropDownFilterProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedForm: string;
  onSelectForm: (form: string) => void;
}

export default function DropDownFilter({
  selectedType,
  onSelectType,
  selectedForm,
  onSelectForm,
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

  const formKorean = [
    { type: "all", korean: "기본" },
    { type: "mega", korean: "메가진화" },
    { type: "gmax", korean: "거다이맥스" },
    { type: "alola", korean: "알로라" },
    { type: "galar", korean: "가라르" },
    { type: "hisui", korean: "히스이" },
    { type: "paldea", korean: "팔데아" },
  ];

  return (
    <div className="w-full mb-2 flex flex-col lg:flex-row justify-between items-start gap-4">
      {/* 타입 필터 */}
      <div className="flex items-start gap-3 flex-1">
        <span className="font-bold text-xs text-gray-500 mt-1 shrink-0">
          타입
        </span>
        <ul className="flex flex-wrap gap-1.5 justify-start">
          {typeKorean.map((type) => (
            <li
              key={type.type}
              onClick={() => onSelectType(type.type)}
              className={`cursor-pointer px-2.5 py-0.5 text-[11px] rounded-full border transition-colors ${
                selectedType === type.type
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {type.korean}
            </li>
          ))}
        </ul>
      </div>

      {/* 폼 필터 */}
      <div className="flex items-start gap-3 shrink-0 lg:border-l lg:pl-4 border-gray-200">
        <span className="font-bold text-xs text-gray-500 mt-1 shrink-0">
          폼
        </span>
        <ul className="flex flex-wrap gap-1.5 justify-start lg:justify-end max-w-[300px]">
          {formKorean.map((form) => (
            <li
              key={form.type}
              onClick={() => onSelectForm(form.type)}
              className={`cursor-pointer px-2.5 py-0.5 text-[11px] rounded-full border transition-colors ${
                selectedForm === form.type
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {form.korean}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
