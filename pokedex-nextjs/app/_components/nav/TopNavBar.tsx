import Link from "next/link";
import SearchBar from "./SearchBar";

export default function TopNavBar() {
  const menuItems = [
    { name: "홈", href: "/" },
    { name: "포켓몬", href: "/pokemon" },
    { name: "타입", href: "/type" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Red Top Section */}
      <div className="bg-red-600 w-full h-16 relative flex items-center justify-center px-4">
        <div className="max-w-7xl w-full flex justify-between items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center z-10">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center overflow-hidden shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <div className="absolute top-0 w-full h-1/2 bg-red-500 border-b-4 border-gray-800"></div>
                <div className="absolute w-3 h-3 bg-white rounded-full border-2 border-gray-800 z-10"></div>
              </div>
              <span className="font-bold text-xl tracking-tight text-white drop-shadow-md group-hover:text-yellow-300 transition-colors">
                Pokedex
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2 z-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-yellow-300 hover:bg-red-700/50 px-4 py-2 rounded-full text-sm font-bold transition-all border-2 border-transparent hover:border-yellow-300/50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center z-10">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Black Line & Center Circle (Pokeball Design) */}
      <div className="relative w-full h-2 bg-gray-800">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-800 flex items-center justify-center">
            <div className="w-6 h-6 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
