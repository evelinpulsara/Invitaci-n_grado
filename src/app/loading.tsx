export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-6"></div>
      <p className="text-cyan-300 font-serif tracking-widest uppercase text-sm">
        Cargando invitación...
      </p>
    </div>
  );
}