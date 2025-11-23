import Link from "next/link";
import SearchBar from "./SearchBar";

export default function TopNavBar() {
  const menuItems = [
    { name: "홈", href: "/" },
    { name: "포켓몬", href: "/pokemon" },
    { name: "타입", href: "/type" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <svg
                className="w-8 h-8 text-red-600 group-hover:rotate-180 transition-transform duration-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
                <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" />
                <circle cx="12" cy="12" r="2" />
                <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                Pokedex
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-bold transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
