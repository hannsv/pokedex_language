import Link from "next/link";

export default function TopNavBar() {
  const menuItems = [
    { name: "홈", href: "/" },
    { name: "포켓몬", href: "/pokemon" },
  ];
  return (
    <div className="w-full bg-amber-50 min-h-18">
      <nav className="flex space-x-4 justify-center center items-center  h-18 p-4">
        <ul className="flex space-x-4 w-full justify-around">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white-500 font-bold hover:bg-gray-500 bg bg-black w-20 h-10 flex items-center justify-center rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </ul>
        <input
          name="search"
          className="text-xs text-gray-600 border bg-white border-gray-300 rounded-md px-2 py-1 outline-orange-400"
          type="text"
          placeholder="포켓몬이름, 도감번호"
          title="a"
        ></input>
      </nav>
    </div>
  );
}
