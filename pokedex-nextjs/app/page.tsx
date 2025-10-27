import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-red-600">
      <button
        className="rounded-full bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        title="home"
        type="button"
      >
        <div>home</div>
      </button>
      <div className="border bg-white ">container</div>
    </div>
  );
}
