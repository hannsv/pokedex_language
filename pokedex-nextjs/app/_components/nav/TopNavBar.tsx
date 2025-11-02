import Link from "next/link";

export default function TopNavBar() {
  const menuItems = [
    { name: "홈", href: "/" },
    { name: "포켓몬", href: "/pokemon" },
  ];
  return (
    <div className="w-full bg-amber-50 min-h-18 sticky top-0 z-50 shadow-md">
      <nav className="flex space-x-8 justify-center center items-center h-18 p-4  max-w-11/12">
        <img
          src="https://w7.pngwing.com/pngs/402/653/png-transparent-ball-pocket-pocket-monster-poke-poke-ball-set-icon.png"
          alt="Logo"
          className="h-10"
        />
        <ul className="flex space-x-2 justify-around">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white-500 font-bold cursor-pointer hover:bg-gray-500 bg bg-black w-20 h-10 flex items-center justify-center rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            name="search"
            className="text-sm text-gray-800 border bg-white border-gray-400 rounded-md h-10 w-10/12 px-2 py-1 outline-orange-400"
            type="text"
            placeholder="포켓몬이름, 도감번호"
            title="a"
          ></input>
          <button className="text-white-500 font-bold cursor-pointer hover:bg-blue-500 bg bg-blue-800 w-20 h-10 flex items-center justify-center rounded-md">
            검색
          </button>
        </div>
      </nav>
    </div>
  );
}
