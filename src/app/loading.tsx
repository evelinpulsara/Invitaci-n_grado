'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-cyan-400 animate-spin" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-4 rounded-full bg-slate-800/60 backdrop-blur-sm"></div>
        </div>
        <p className="text-cyan-300 font-serif text-sm uppercase tracking-widest animate-pulse">
          Cargando invitación...
        </p>
      </div>
    </div>
  );
}