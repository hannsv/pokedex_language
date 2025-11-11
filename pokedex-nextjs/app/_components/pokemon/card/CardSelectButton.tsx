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
        className="text-white-500 font-bold cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center rounded-md mb-4"
      >
        <span className="m-3">{string}</span>
      </button>
    </div>
  );
}
