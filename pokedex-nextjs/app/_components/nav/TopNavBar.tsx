import Link from "next/link";

export default function TopNavBar() {
  const menuItems = [
    { name: "홈", href: "/" },
    { name: "포켓몬", href: "/pokemon" },
  ];
  return (
    <div className="w-full bg-amber-50 min-h-18 sticky top-0 z-50 shadow-md">
      <nav className="flex space-x-4 justify-center center items-center  h-18 p-4  max-w-11/12">
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
          className="text-sm text-gray-800 border bg-white border-gray-400 rounded-md h-10 w-6/12 px-2 py-1 outline-orange-400"
          type="text"
          placeholder="포켓몬이름, 도감번호"
          title="a"
        ></input>
      </nav>
    </div>
  );
}
