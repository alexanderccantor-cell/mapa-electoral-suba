import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { upzData, upzCentros } from '@/data/upz-data';

interface LeyendaUPZProps {
  onFlyTo: (lat: number, lng: number, zoom?: number) => void;
}

export function LeyendaUPZ({ onFlyTo }: LeyendaUPZProps) {
  const [colapsado, setColapsado] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 rounded-xl overflow-hidden shadow-lg max-w-[220px]">
      <button
        onClick={() => setColapsado(!colapsado)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-900/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">UPZ de Suba</span>
        </div>
        {colapsado ? (
          <ChevronDown className="w-3 h-3 text-slate-400" />
        ) : (
          <ChevronUp className="w-3 h-3 text-slate-400" />
        )}
      </button>

      {!colapsado && (
        <div className="px-2 pb-2 max-h-48 overflow-y-auto scrollbar-thin">
          {upzData.map((upz) => (
            <button
              key={upz.id}
              onClick={() => {
                const centro = upzCentros[upz.nombre];
                if (centro) {
                  onFlyTo(centro[0], centro[1], 14);
                }
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors text-left group"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20 group-hover:scale-125 transition-transform"
                style={{
                  backgroundColor: upz.colorNeon,
                  boxShadow: `0 0 6px ${upz.colorNeon}60`,
                }}
              />
              <span className="text-xs text-slate-300 group-hover:text-white transition-colors truncate">
                {upz.nombre}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
