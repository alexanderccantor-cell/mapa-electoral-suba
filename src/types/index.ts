export interface Pin {
  id: string;
  titulo: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  upz: string;
  barrio: string;
  direccion_referencia?: string;
  imagen_url: string;
  imagen_descarga_url: string;
  video_url: string;
  creado_at: string;
}

export interface UPZ {
  id: string;
  nombre: string;
  colorNeon: string;
  coordenadasLimite: [number, number][];
  barrios: string[];
}

export interface BusquedaResultado {
  tipo: 'upz' | 'barrio' | 'pin';
  nombre: string;
  upz?: string;
  coordenadas: [number, number];
  descripcion?: string;
}
