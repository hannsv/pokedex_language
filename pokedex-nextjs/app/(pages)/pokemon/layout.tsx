export default function PokemonListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg min-h-screen min-w-11/12 bg-white p-8">
      {children}
    </div>
  );
}
