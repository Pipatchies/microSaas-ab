export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="font-heading text-4xl font-bold text-primary mb-2">
              TastyRoad
            </h1>
            <p className="font-subtitle text-zinc-500 text-sm">
              Votre voyage gourmand commence ici
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
