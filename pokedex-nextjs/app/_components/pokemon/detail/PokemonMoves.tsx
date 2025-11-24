"use client";

import React, { useEffect, useState } from "react";
import TypeCard from "@/app/_components/pokemon/type/TypeCard";
import { PokemonData } from "@/app/lib/types/types";

interface PokemonMovesProps {
  moves: PokemonData["moves"];
}

interface MoveDetail {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  pp: number;
  level: number;
}

// Define a type for the processed move item
interface ProcessedMove {
  move: {
    name: string;
    url: string;
  };
  level_learned_at: number;
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
  const [displayedMoves, setDisplayedMoves] = useState<MoveDetail[]>([]);
  const [allLevelUpMoves, setAllLevelUpMoves] = useState<ProcessedMove[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const fetchMoveDetails = async (moveList: ProcessedMove[]) => {
    const movePromises = moveList.map(async (m) => {
      const res = await fetch(m.move.url);
      const moveData = await res.json();
      const koreanName =
        moveData.names.find(
          (n: { language: { name: string }; name: string }) =>
            n.language.name === "ko"
        )?.name || moveData.name;
      return {
        name: koreanName,
        type: moveData.type.name,
        power: moveData.power,
        accuracy: moveData.accuracy,
        pp: moveData.pp,
        level: m.level_learned_at,
      };
    });
    const newMoves = await Promise.all(movePromises);
    setDisplayedMoves((prev) => [...prev, ...newMoves]);
  };

  useEffect(() => {
    let isMounted = true;

    // 초기화 및 레벨업 기술 필터링
    const levelUpMoves: ProcessedMove[] = moves
      .filter((m) =>
        m.version_group_details.some(
          (d) => d.move_learn_method.name === "level-up"
        )
      )
      .map((m) => {
        // 가장 최신 버전(또는 특정 버전)의 데이터를 가져오는 것이 좋지만,
        // 여기서는 단순히 첫 번째 level-up 데이터를 가져옵니다.
        // 실제로는 version_group_details를 순회하며 원하는 버전 그룹을 찾아야 할 수도 있습니다.
        const detail = m.version_group_details.find(
          (d) => d.move_learn_method.name === "level-up"
        );
        return {
          move: m.move,
          level_learned_at: detail?.level_learned_at || 0,
        };
      })
      .sort((a, b) => a.level_learned_at - b.level_learned_at);

    setAllLevelUpMoves(levelUpMoves);
    setPage(1);

    // 초기 데이터 로드
    const loadInitialMoves = async () => {
      const initialBatch = levelUpMoves.slice(0, ITEMS_PER_PAGE);
      const movePromises = initialBatch.map(async (m) => {
        const res = await fetch(m.move.url);
        const moveData = await res.json();
        const koreanName =
          moveData.names.find(
            (n: { language: { name: string }; name: string }) =>
              n.language.name === "ko"
          )?.name || moveData.name;
        return {
          name: koreanName,
          type: moveData.type.name,
          power: moveData.power,
          accuracy: moveData.accuracy,
          pp: moveData.pp,
          level: m.level_learned_at,
        };
      });

      const newMoves = await Promise.all(movePromises);
      if (isMounted) {
        setDisplayedMoves(newMoves);
      }
    };

    loadInitialMoves();

    return () => {
      isMounted = false;
    };
  }, [moves]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const nextBatch = allLevelUpMoves.slice(start, end);

    if (nextBatch.length > 0) {
      fetchMoveDetails(nextBatch);
      setPage(nextPage);
    }
  };

  const hasMore = allLevelUpMoves.length > page * ITEMS_PER_PAGE;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3 text-gray-700 border-b pb-2">
        기술 정보 (Level Up)
      </h2>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lv
              </th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                타입
              </th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                위력
              </th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                명중률
              </th>
              <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedMoves.map((move, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-900 font-medium">
                  {move.level}
                </td>
                <td className="py-2 px-4 text-sm text-gray-900 font-bold">
                  {move.name}
                </td>
                <td className="py-2 px-4 text-sm">
                  <TypeCard typeNames={move.type} />
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {move.power || "-"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {move.accuracy || "-"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">{move.pp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
}
