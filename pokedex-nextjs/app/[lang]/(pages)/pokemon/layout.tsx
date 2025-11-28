export default function PokemonListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg min-h-screen min-w-11/12 bg-transparent p-0 md:p-4">
      {children}
    </div>
  );
}
