interface CardSelectButtonProps {
  string: string;
  onClick: () => void;
}

export default function CardSelectButton({
  string,
  onClick,
}: CardSelectButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        className="w-10 h-10 text-gray-800 dark:text-[#EAEAEA] font-bold cursor-pointer bg-white dark:bg-[#1E1E1E] border-2 border-gray-800 dark:border-[#FFD700] hover:bg-gray-50 dark:hover:bg-[#333] flex items-center justify-center rounded-xl shadow-[2px_2px_0px_0px_rgba(31,41,55,1)] dark:shadow-[2px_2px_0px_0px_#FFD700] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
      >
        <span className="text-lg">{string}</span>
      </button>
    </div>
  );
}
