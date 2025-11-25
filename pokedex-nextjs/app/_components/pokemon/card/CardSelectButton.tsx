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
        className="w-10 h-10 text-gray-800 font-bold cursor-pointer bg-white border-2 border-gray-800 hover:bg-gray-50 flex items-center justify-center rounded-xl shadow-[2px_2px_0px_0px_rgba(31,41,55,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
      >
        <span className="text-lg">{string}</span>
      </button>
    </div>
  );
}
