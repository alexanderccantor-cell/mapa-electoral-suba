import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { upzData, upzCentros } from '@/data/upz-data';
import type { Pin } from '@/types';

export interface MapaSubaHandle {
  flyTo: (lat: number, lng: number, zoom?: number) => void;
}

interface MapaSubaProps {
  pines: Pin[];
  pinSeleccionado: Pin | null;
  onPinSelect: (pin: Pin) => void;
  onMapClick?: (lat: number, lng: number) => void;
  isAdmin?: boolean;
}

// Create neon pin icon using inline SVG string (no renderToString needed)
function createNeonIcon(color: string): L.DivIcon {
  const svgHtml = `
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}80);">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-neon-pin',
    html: svgHtml,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

// Admin click marker icon
const adminClickIcon = L.divIcon({
  className: 'admin-click-marker',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#00f3ff;border:2px solid white;box-shadow:0 0 10px #00f3ff,0 0 20px #00f3ff40;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export const MapaSuba = forwardRef<MapaSubaHandle, MapaSubaProps>(function MapaSuba(
  { pines, pinSeleccionado, onPinSelect, onMapClick, isAdmin = false },
  ref
) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polygonsRef = useRef<L.Polygon[]>([]);
  const adminMarkerRef = useRef<L.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Expose flyTo via ref
  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number, zoom?: number) => {
      if (mapRef.current) {
        mapRef.current.flyTo([lat, lng], zoom || 15, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }
    },
  }), []);

  // Initialize map
  useEffect(() => {
    let rafId: number;

    const tryInit = () => {
      if (!containerRef.current || mapRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        rafId = requestAnimationFrame(tryInit);
        return;
      }

      initMap();
    };

    function initMap() {
      if (!containerRef.current || mapRef.current) return;

      try {
        const map = L.map(containerRef.current, {
          center: [4.7431, -74.074],
          zoom: 13,
          zoomControl: true,
          attributionControl: false,
        });

        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            subdomains: 'abcd',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        ).addTo(map);

        L.control.attribution({ position: 'bottomright' }).addTo(map);

        mapRef.current = map;

        setTimeout(() => {
          map.invalidateSize();
          setMapReady(true);
        }, 200);
      } catch (err) {
        console.error('Error initializing map:', err);
        setInitError(err instanceof Error ? err.message : 'Error inicializando el mapa');
      }
    }

    tryInit();

    return () => {
      cancelAnimationFrame(rafId);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Setup click handler for admin mode
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    map.off('click');

    const clickHandler = (e: L.LeafletMouseEvent) => {
      if (isAdmin && onMapClick) {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
        if (adminMarkerRef.current) {
          adminMarkerRef.current.remove();
        }
        const marker = L.marker([lat, lng], { icon: adminClickIcon }).addTo(map);
        adminMarkerRef.current = marker;
      }
    };

    map.on('click', clickHandler);
    return () => { map.off('click', clickHandler); };
  }, [isAdmin, onMapClick]);

  // Draw UPZ polygons
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    polygonsRef.current.forEach((p) => p.remove());
    polygonsRef.current = [];

    upzData.forEach((upz) => {
      const polygon = L.polygon(upz.coordenadasLimite, {
        color: upz.colorNeon,
        weight: 2,
        opacity: 0.6,
        fillColor: upz.colorNeon,
        fillOpacity: 0.08,
        dashArray: '5, 5',
      })
        .addTo(mapRef.current!)
        .bindTooltip(upz.nombre, {
          permanent: false,
          direction: 'center',
          className: 'upz-tooltip',
        });

      polygon.on('click', () => {
        const centro = upzCentros[upz.nombre];
        if (centro && mapRef.current) {
          mapRef.current.flyTo(centro, 14, {
            duration: 1.5,
            easeLinearity: 0.25,
          });
        }
      });

      polygonsRef.current.push(polygon);
    });
  }, [mapReady]);

  // Draw pin markers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    pines.forEach((pin) => {
      const upz = upzData.find(
        (u) =>
          u.nombre.toLowerCase() === pin.upz.toLowerCase() ||
          pin.upz.toLowerCase().includes(u.nombre.toLowerCase())
      );
      const color = upz?.colorNeon || '#00f3ff';

      const marker = L.marker([pin.latitud, pin.longitud], {
        icon: createNeonIcon(color),
      })
        .addTo(mapRef.current!)
        .on('click', () => { onPinSelect(pin); });

      marker.bindTooltip(pin.titulo, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        className: 'pin-tooltip',
      });

      markersRef.current.push(marker);
    });
  }, [pines, onPinSelect, mapReady]);

  // Fly to selected pin
  useEffect(() => {
    if (pinSeleccionado && mapRef.current && mapReady) {
      mapRef.current.flyTo(
        [pinSeleccionado.latitud, pinSeleccionado.longitud],
        16,
        { duration: 1.5, easeLinearity: 0.25 }
      );
    }
  }, [pinSeleccionado, mapReady]);

  if (initError) {
    return (
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}
      >
        <div className="text-center p-6">
          <p className="text-red-400 text-sm mb-2">Error al cargar el mapa</p>
          <p className="text-slate-500 text-xs">{initError}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mapa-suba-container"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#0a0a0a' }}
    />
  );
});
