'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  MessageCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Gift,
  Stethoscope,
  Microscope,
  Dna,
  Syringe,
  Sparkles,
  Calendar,
  Clock
} from 'lucide-react';

export default function MedicalInvitation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [processedSapo, setProcessedSapo] = useState<string | null>(null);
  const [processedTiana, setProcessedTiana] = useState<string | null>(null);

useEffect(() => {
  const calculateTimeLeft = () => {
    // 🕒 22 de noviembre de 2025, 7:00 PM → en UTC es 00:00 del 23/11 (porque -5h)
    // Entonces: 22/11/2025 19:00 Colombia = 23/11/2025 00:00 UTC
    const targetDate = Date.UTC(2025, 10, 23, 0, 0, 0); // Mes 10 = noviembre (0-indexed)
    const now = Date.now();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  calculateTimeLeft();
  const timer = setInterval(calculateTimeLeft, 1000);
  return () => clearInterval(timer);
}, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e: Error) => {
          console.log('Autoplay bloqueado', e.message);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleWhatsapp = () => {
    const phone = '+573228195056';
    const message = 'Hola, confirmo mi asistencia a la entrega de batas de Deyby Gallardo 🎉🩺';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

const handleMaps = () => {
  window.open(
    'https://www.google.com/maps/search/Restaurante+La+Merced,+La+Aurora,+Pasto,+Nari%C3%B1o,+Colombia',
    '_blank'
  );
};

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const processImageToCutout = async (src: string, tolerance = 200): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('No canvas context'));
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (r >= tolerance && g >= tolerance && b >= tolerance) {
              data[i + 3] = 0;
            }
          }
          ctx.putImageData(imgData, 0, 0);
          const out = canvas.toDataURL('image/png');
          resolve(out);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const sapoData = await processImageToCutout('/imagenes/coso1.png', 200);
        setProcessedSapo(sapoData);
      } catch (e) {
        console.warn('Procesamiento sapo falló', e);
      }
      try {
        const tianaData = await processImageToCutout('/imagenes/cosoo.png', 200); // ✅ corregido cosoo → coso2
        setProcessedTiana(tianaData);
      } catch (e) {
        console.warn('Procesamiento tiana falló', e);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="fixed top-20 left-10 opacity-20 animate-float hidden lg:block">
        <Stethoscope size={64} className="text-cyan-400" />
      </div>
      <div className="fixed bottom-40 right-20 opacity-20 animate-float hidden lg:block">
        <Microscope size={56} className="text-blue-400" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-16 pb-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-8 animate-fadeIn">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 blur-2xl opacity-40 animate-pulse"></div>
                <img 
                  src="/imagenes/gorro.png" 
                  alt="gorro" 
                  className="relative w-48 md:w-64 lg:w-72 object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>

            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-center gap-3 items-center mb-4">
                <Sparkles className="text-cyan-400 animate-pulse" size={32} />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] text-cyan-100 uppercase">
                  Entrega de Batas
                </h1>
                <Sparkles className="text-cyan-400 animate-pulse" size={32} />
              </div>

              <div className="relative inline-block">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 blur-3xl opacity-30"></div>
                <h2 className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif italic text-white leading-tight px-4">
                  Dr. Deyby Santiago
                  <br />
                  <span className="text-cyan-300">Argoty Gallardo</span>
                </h2>
              </div>

              <div className="flex justify-center gap-6 mt-8 items-center">
                <img 
                  src={processedSapo || '/imagenes/coso1.png'} 
                  alt="Coso1" 
                  className="w-16 h-16 object-contain animate-bounce drop-shadow-xl" 
                />
                <div className="relative">
                  <Heart size={56} className="text-red-500 animate-pulse fill-current" />
                  <div className="absolute inset-0 animate-ping">
                    <Heart size={56} className="text-red-400 opacity-40" />
                  </div>
                </div>
                <img 
                  src={processedTiana || '/imagenes/coso2.png'} 
                  alt="Coso2" 
                  className="w-16 h-16 object-contain animate-bounce drop-shadow-xl" 
                />
              </div>
            </div>
          </div>

          {/* Reproductor de música - Diseño simplificado */}
          <div className="max-w-xl mx-auto mb-12 animate-fadeIn">
            <div className="bg-linear-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-cyan-500/20">
              <div className="flex gap-6">
                <div className="relative shrink-0 group">
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/30">
                    <img src="/imagenes/hijo.jpg" alt="Portada" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-cyan-300 font-medium">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 my-2">
                    <button
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                        }
                      }}
                      className="bg-slate-700/50 hover:bg-slate-600/50 text-cyan-400 rounded-full p-2 transition-all hover:scale-110"
                    >
                      <SkipBack size={20} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
                    >
                      {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                    <button
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
                        }
                      }}
                      className="bg-slate-700/50 hover:bg-slate-600/50 text-cyan-400 rounded-full p-2 transition-all hover:scale-110"
                    >
                      <SkipForward size={20} />
                    </button>
                  </div>

                  <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
                    <Stethoscope size={20} className="text-cyan-400 animate-pulse" />
                    <Microscope size={20} className="text-blue-400 animate-pulse" />
                    <Dna size={20} className="text-indigo-400 animate-pulse" />
                    <Syringe size={20} className="text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <audio
              ref={audioRef}
              src="/musica/Grado.mp3"
              preload="auto"
              loop
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => {
                handleTimeUpdate();
                if (audioRef.current) {
                  audioRef.current.volume = 0.8;
                }
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto mb-16 animate-fadeIn">
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
              <div className="text-center">
                <div className="inline-block bg-linear-to-r from-cyan-500 to-blue-500 rounded-3xl px-12 py-6 shadow-2xl">
                  <p className="text-3xl md:text-4xl font-serif text-white font-bold">¡El evento ha comenzado! 🎉</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-4 mb-6">
                    <div className="w-16 h-0.5 bg-linear-to-r from-transparent to-cyan-500"></div>
                    <Clock className="text-cyan-400" size={40} />
                    <h3 className="text-3xl md:text-4xl font-serif text-white">Faltan</h3>
                    <Clock className="text-cyan-400" size={40} />
                    <div className="w-16 h-0.5 bg-linear-to-l from-transparent to-cyan-500"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                  {[
                    { value: timeLeft.days, label: 'Días' },
                    { value: timeLeft.hours, label: 'Horas' },
                    { value: timeLeft.minutes, label: 'Minutos' },
                    { value: timeLeft.seconds, label: 'Segundos' }
                  ].map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-linear-to-br from-slate-800 to-blue-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl transform group-hover:scale-105 transition-transform">
                        <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-cyan-300 text-sm font-semibold uppercase tracking-widest mt-2">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto mb-16 animate-fadeIn">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-linear-to-br from-slate-800 to-blue-900 rounded-3xl p-3 border-2 border-cyan-500/30 shadow-2xl">
                <div className="relative w-full min-h-[400px] md:min-h-[600px] rounded-2xl overflow-hidden">
                  <img 
                    src="/imagenes/hijo.jpg" 
                    alt="Foto Principal" 
                    className="w-full h-full object-contain md:object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-6 right-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-full p-3 border border-cyan-500/50">
                        <Stethoscope size={32} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16 px-4 animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-cyan-500/20 shadow-2xl">
                <div className="text-center space-y-8">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-24 h-px bg-linear-to-r from-transparent to-cyan-500"></div>
                    <Sparkles className="text-cyan-400" size={24} />
                    <div className="w-24 h-px bg-linear-to-l from-transparent to-cyan-500"></div>
                  </div>

                  <p className="text-cyan-100 text-lg md:text-xl font-light leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Los sueños se construyen con esfuerzo, dedicación y amor.
                    <br /><br />
                    Hoy celebramos el inicio de una nueva etapa, donde el compromiso con la vida y el deseo de servir se visten de blanco.
                    <br /><br />
                    Este día marca el comienzo de un camino lleno de vocación, esperanza y fe.
                    <br />
                    Por eso, tengo el honor de invitarte a acompañarnos a mi
                    <br />
                    <span className="text-cyan-300 font-semibold">Ceremonia de Entrega de Batas</span>
                    <br />
                    para celebrar este logro tan especial.
                  </p>

                  <div className="flex justify-center">
                    <div className="relative animate-float">
                      <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-30"></div>
                      <img src="/imagenes/gorro.png" alt="Icono médico" className="relative w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-script text-cyan-300" style={{ fontFamily: 'cursive' }}>
                      Bienvenidos a este día inolvidable
                    </h3>
                    <p className="text-cyan-200 text-xl font-light" style={{ fontFamily: 'Georgia, serif' }}>
                      Con la bendición de Dios y el amor de mi madre
                    </p>
                    <p className="text-3xl md:text-4xl font-script text-cyan-400" style={{ fontFamily: 'cursive' }}>
                      Karol Gallardo
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-24 h-px bg-linear-to-r from-transparent to-cyan-500"></div>
                    <Sparkles className="text-cyan-400" size={24} />
                    <div className="w-24 h-px bg-linear-to-l from-transparent to-cyan-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16 px-4 animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-cyan-500/20 shadow-2xl">
                <div className="text-center space-y-12">
                  <div>
                    <div className="inline-flex items-center gap-4 mb-4"> {/* Reducí el gap también para ajuste visual */}
                      <Calendar className="text-cyan-400 h-8 w-8 sm:h-10 sm:w-10" /> {/* Icono más pequeño y responsive */}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white uppercase tracking-[0.3em]">
                        Noviembre
                      </h2>
                      <Calendar className="text-cyan-400 h-8 w-8 sm:h-10 sm:w-10" /> {/* Mismo tamaño que el anterior */}
                    </div>
                    <div className="flex justify-center">
                      <div className="w-48 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent"></div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-linear-to-br from-slate-800 to-blue-900 rounded-2xl px-8 py-6 border border-cyan-500/30">
                        <p className="text-xl md:text-2xl font-serif text-cyan-300 uppercase tracking-widest">Sábado</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
                      <div className="relative">
                        <div className="text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none font-serif font-bold bg-linear-to-br from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                          22
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 border-2 border-cyan-500/20 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-linear-to-br from-slate-800 to-blue-900 rounded-2xl px-8 py-6 border border-cyan-500/30">
                        <p className="text-xl md:text-2xl font-serif text-cyan-300 uppercase tracking-widest">7:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-center mb-4">
                      <div className="w-48 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent"></div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-[0.3em]">2025</h3>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-16 h-px bg-linear-to-r from-transparent to-cyan-500"></div>
                    <Sparkles className="text-cyan-400" size={20} />
                    <div className="w-32 h-px bg-cyan-500/50"></div>
                    <Sparkles className="text-cyan-400" size={24} />
                    <div className="w-32 h-px bg-cyan-500/50"></div>
                    <Sparkles className="text-cyan-400" size={20} />
                    <div className="w-16 h-px bg-linear-to-l from-transparent to-cyan-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16 px-4 animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-cyan-500/20 shadow-2xl text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <MapPin size={48} className="text-cyan-400 drop-shadow-lg" />
                    <div className="absolute inset-0 animate-ping">
                      <MapPin size={48} className="text-cyan-300 opacity-40" />
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl text-cyan-300 font-serif mb-6">Lugar</h3>
                <div className="space-y-2 mb-8">
                  <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                    Restaurante la Merced
                  </p>
                  <p className="text-cyan-200 text-xl">Salón Mandarín</p>
                  <p className="text-cyan-300 text-lg">Pasto, Nariño - Colombia</p>
                </div>
                <button
                  onClick={handleMaps}
                  className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-full shadow-xl transform hover:scale-110 transition-all"
                >
                  <MapPin size={22} /> Cómo llegar
                </button>
              </div>
            </div>
          </div>

          {/* Lluvia de sobres - Diseño mejorado */}
          <div className="max-w-2xl mx-auto px-4 py-12 text-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-200/40 to-cyan-200/40 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl"></div>
              <div className="relative p-8">
                <div className="flex justify-center mb-4">
                  <Gift size={48} className="text-blue-300 drop-shadow-md" />
                </div>
                <p className="text-blue-300 text-xl font-bold mb-3 drop-shadow"
                   style={{
                     fontFamily: 'Georgia, serif',
                     textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                   }}>
                  Lluvia de Sobres
                </p>
                <p className="text-cyan-200 text-lg italic drop-shadow"
                   style={{
                     fontFamily: 'Georgia, cursive',
                     textShadow: '0 2px 6px rgba(0,0,0,0.15)',
                   }}>
                  Tu presencia es el mejor regalo
                </p>
              </div>
            </div>
          </div>

          {/* RSVP */}
          <div className="max-w-2xl mx-auto px-4 py-12 text-center mb-12">
            <p className="text-blue-300 text-lg mb-8 font-light">
              Queremos preparar todos los detalles, déjanos saber si contaremos con tu asistencia.
            </p>
            <button
              onClick={handleWhatsapp}
              className="inline-flex items-center gap-3 bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 text-lg"
            >
              <MessageCircle size={26} /> Confirmar asistencia
            </button>
          </div>

          {/* Footer */}
<div className="text-center py-6">
  <div className="flex justify-center gap-6 mb-4">
    <Syringe size={36} className="text-blue-300" />
    <Stethoscope size={36} className="text-cyan-300" />
    <Syringe size={36} className="text-blue-300" />
  </div>
  <p className="text-gray-400 text-sm font-light">Diseñado por: Evelin Pulsara</p>
  <p className="text-xs text-gray-400 font-medium mt-2">
    Contacto: 
    <button
      onClick={() => {
        const phone = '+573196933085';
        const message = 'Hola Evelin, quiero reservar un diseño de invitación. ¿Tienes disponibilidad? 😊';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      }}
      className="underline hover:text-cyan-300 transition-colors cursor-pointer"
      aria-label="Enviar mensaje por WhatsApp"
    >
      3196933085
    </button>
  </p>
</div>
        </div>
      </div>
    </div>
  );
}