"use client";

import { useState, useEffect } from "react";

const triviaListKo = [
  "피카츄의 볼 주머니는 전기를 저장하는 곳입니다.",
  "잠만보는 하루에 400kg의 음식을 먹습니다.",
  "메타몽은 무엇으로든 변신할 수 있습니다.",
  "이브이는 8가지의 다양한 진화형을 가지고 있습니다.",
  "잉어킹은 튀어오르기 밖에 못하지만 갸라도스로 진화하면 강력해집니다.",
  "뮤는 모든 포켓몬의 유전자를 가지고 있다고 전해집니다.",
  "야돈은 꼬리로 낚시를 하다가 꼬리를 물리면 야도란으로 진화합니다.",
  "고라파덕은 두통이 심해질수록 강력한 염력을 사용합니다.",
  "푸린의 노래를 들으면 누구든지 잠이 듭니다.",
  "디그다의 땅 아래 모습은 아무도 본 적이 없다고 합니다.",
  "파이리는 꼬리의 불꽃이 꺼지면 생명을 잃는다는 소문이 있습니다.",
  "꼬부기의 등껍질은 매우 단단하여 방어에 유리합니다.",
  "이상해씨의 등에는 태어날 때부터 식물의 씨앗이 심어져 있습니다.",
  "팬텀은 그림자 속에 숨어 사람을 놀래키는 것을 좋아합니다.",
  "나옹은 반짝이는 동전을 매우 좋아합니다.",
  "토게피의 껍질 안에는 행복이 가득 차 있다고 합니다.",
  "마자용은 참기 포켓몬으로 공격을 받아치는 데 능숙합니다.",
  "럭키를 발견하면 행운이 찾아온다는 전설이 있습니다.",
  "라프라스는 사람을 태우고 바다를 건너는 것을 좋아합니다.",
  "망나뇽은 지구를 약 16시간 만에 한 바퀴 돌 수 있습니다.",
  "알통몬은 하루 종일 근력 운동을 해도 지치지 않습니다.",
  "캐터피는 발에서 냄새가 나는 액체를 내뿜어 적을 쫓아냅니다.",
  "단데기는 껍질이 단단해지기 전에는 충격에 약합니다.",
  "버터플은 꿀을 모으기 위해 꽃밭을 찾아다닙니다.",
  "독침붕은 영역 의식이 강해 접근하는 자를 집단으로 공격합니다.",
  "구구는 방향 감각이 뛰어나 집을 잃어버리지 않습니다.",
  "레트라는 앞니가 계속 자라기 때문에 딱딱한 것을 갉아야 합니다.",
  "깨비참은 날개가 짧아도 빠르게 날 수 있습니다.",
  "아보의 턱은 분리될 수 있어 큰 먹이도 삼킬 수 있습니다.",
  "피카츄는 숲속에서 동료들과 꼬리를 맞대고 전기를 교환합니다.",
];

const triviaListEn = [
  "Pikachu's cheek pouches store electricity.",
  "Snorlax eats 400kg of food every day.",
  "Ditto can transform into anything.",
  "Eevee has 8 different evolutions.",
  "Magikarp can only splash, but evolves into powerful Gyarados.",
  "Mew is said to possess the genetic composition of all Pokémon.",
  "Slowpoke uses its tail to fish, and evolves if bitten by a Shellder.",
  "Psyduck uses powerful psychokinesis when its headache gets severe.",
  "Jigglypuff's song puts anyone who hears it to sleep.",
  "No one has ever seen what Diglett looks like underground.",
  "It is said that if the flame on Charmander's tail goes out, it will die.",
  "Squirtle's shell is very hard and useful for defense.",
  "Bulbasaur has a plant seed on its back from birth.",
  "Gengar loves to hide in shadows and scare people.",
  "Meowth loves shiny coins.",
  "Togepi's shell is said to be filled with happiness.",
  "Wobbuffet is the Patient Pokémon and is good at countering attacks.",
  "It is said that finding a Chansey brings happiness.",
  "Lapras loves ferrying people across the sea.",
  "Dragonite can circle the globe in just 16 hours.",
];

const triviaListZh = [
  "皮卡丘的脸颊囊是储存电力的地方。",
  "卡比兽每天要吃400公斤的食物。",
  "百变怪可以变身成任何东西。",
  "伊布有8种不同的进化形态。",
  "鲤鱼王只能跳跃，但进化成暴鲤龙后会变得非常强大。",
  "据说梦幻拥有所有宝可梦的基因。",
  "呆呆兽用尾巴钓鱼，如果被大舌贝咬住就会进化成呆壳兽。",
  "可达鸭头痛越剧烈，使用的念力就越强大。",
  "听到胖丁的歌声，任何人都会睡着。",
  "据说没有人见过地鼠在地下的样子。",
  "据说如果小火龙尾巴上的火焰熄灭，它就会死去。",
  "杰尼龟的壳非常坚硬，有利于防御。",
  "妙蛙种子出生时背上就种着植物的种子。",
  "耿鬼喜欢躲在阴影里吓人。",
  "喵喵非常喜欢闪亮的硬币。",
  "据说波克比的壳里充满了幸福。",
  "果然翁是忍耐宝可梦，擅长反击。",
  "据说发现吉利蛋会带来好运。",
  "拉普拉斯喜欢载着人渡海。",
  "快龙只需16小时就能绕地球一圈。",
];

interface RandomTriviaProps {
  trigger: number;
  lang: "ko" | "en" | "zh";
}

export default function RandomTrivia({ trigger, lang }: RandomTriviaProps) {
  const [trivia, setTrivia] = useState("");

  useEffect(() => {
    // Hydration mismatch 방지를 위해 클라이언트에서만 랜덤 선택
    const list =
      lang === "ko"
        ? triviaListKo
        : lang === "zh"
        ? triviaListZh
        : triviaListEn;
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * list.length);
      setTrivia(list[randomIndex]);
    }, 0);
    return () => clearTimeout(timer);
  }, [trigger, lang]);

  return (
    <div className="mt-8 text-center px-4 h-36 flex items-start justify-center">
      {trivia && (
        <div
          key={trigger} // Trigger animation on change
          className="animate-in fade-in slide-in-from-bottom-2 duration-500 relative inline-block bg-white dark:bg-[#1E1E1E] border-2 border-gray-800 dark:border-[#FFD700] rounded-xl px-6 py-4 shadow-[4px_4px_0px_0px_rgba(31,41,55,1)] dark:shadow-[4px_4px_0px_0px_#FFD700]"
        >
          {/* Speech Bubble Tail */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#1E1E1E] border-t-2 border-l-2 border-gray-800 dark:border-[#FFD700] rotate-45 transform origin-center"></div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-white bg-red-500 dark:bg-[#FFD700] dark:text-black px-2 py-0.5 rounded-full border border-gray-800 dark:border-[#FFD700] shadow-sm">
              POKÉMON TIP
            </span>
            <span className="text-gray-800 dark:text-[#EAEAEA] font-bold text-sm sm:text-base break-keep leading-relaxed">
              {trivia}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
