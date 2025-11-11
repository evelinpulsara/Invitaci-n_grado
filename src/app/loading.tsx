'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(false);

  // Pequeño delay para evitar parpadeo en cargas muy rápidas
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center space-y-6 p-6">
        {/* Spinner doble con degradado */}
        <div className="relative">
          {/* Capa exterior (lenta, suave) */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              background: 'conic-gradient(from 180deg, transparent, #06b6d4 50%, transparent 100%)',
              animation: 'spin 3s linear infinite',
            }}
          ></div>
          
          {/* Capa interior (rápida, brillante) */}
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent"
            style={{
              background: 'conic-gradient(from 90deg, #38bdf8, #818cf8, #38bdf8)',
              animation: 'spin 1.2s linear infinite',
            }}
          ></div>

          {/* Centro sólido */}
          <div className="absolute inset-4 rounded-full bg-slate-800/60 backdrop-blur-sm"></div>
        </div>

        {/* Texto */}
        <p className="text-cyan-300 font-serif text-sm uppercase tracking-widest animate-pulse">
          Cargando invitación...
        </p>

        {/* Estrellas sutiles (como en tu diseño) */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-1 w-1 rounded-full bg-cyan-400/60 animate-ping"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.8s',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Estilos CSS embebidos para las animaciones personalizadas */}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}