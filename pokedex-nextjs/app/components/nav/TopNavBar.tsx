import Link from "next/link";

export default function TopNavBar() {
  return (
    <div className="w-full bg-amber-50 min-h-18">
      <nav>
        <ul className="flex space-x-4 justify-center center items-center h-18 py-4">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              홈
            </Link>
          </li>
          <li>
            <Link href="/list" className="text-blue-500 hover:underline">
              목록
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
