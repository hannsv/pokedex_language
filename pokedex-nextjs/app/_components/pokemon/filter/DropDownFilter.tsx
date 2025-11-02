"use client";

export default function DropDownFilter() {
  const typeKorean = [
    { type: "common", korean: "공통" },
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
    // { type: "stellar", korean: "별자리" },
    // { type: "shadow", korean: "그림자" },
    // { type: "unknown", korean: "알 수 없음" },
  ];

  const handleClick = () => alert("clicked");

  return (
    <div className="">
      <button className="border p-1 " title="asd" onClick={handleClick}>
        타입 필터
      </button>
      <ul className="grid grid-cols-10 gap-2 mt-2 justify-center">
        {typeKorean.map((type) => (
          <li
            className="border border-gray-300 p-0.5 text-xs rounded-lg"
            key={type.type}
          >
            {type.korean}
          </li>
        ))}
      </ul>
    </div>
  );
}
