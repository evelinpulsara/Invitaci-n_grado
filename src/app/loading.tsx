// src/app/loading.tsx — versión minimal y compatible
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur">
      <div className="text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
        <p className="mt-4 text-cyan-300 font-serif text-sm uppercase tracking-widest">
          Cargando...
        </p>
      </div>
    </div>
  );
}