import { upzCentros } from './upz-data';

export interface BusquedaItem {
  tipo: 'upz' | 'barrio' | 'direccion';
  nombre: string;
  upz?: string;
  coordenadas: [number, number];
  descripcion?: string;
}

// Todos los barrios de Suba organizados por UPZ
const barriosPorUPZ: Record<string, string[]> = {
  'Suba Centro': [
    'Suba Centro', 'El Pórtico', 'El Pinar', 'Tuna Alta', 'Tuna Baja',
    'Prados de Suba', 'Villa del Campo', 'Costa Azul', 'Santa Isabel',
    'San Francisco', 'Bosques de San Jorge', 'El Salitre', 'Alcázar de Suba',
    'Almendros Norte', 'Campanela', 'La Fontana', 'La Campiña', 'Java',
    'Las Orquídeas', 'Londres', 'Miraflores', 'Navetas',
    'Almendros de Suba', 'Las Flores', 'Pradera de Suba',
    'Rincón de Santa Inés', 'Turingia', 'Villa Esperanza',
    'Villa Hermosa', 'Villa Susana', 'Los Lagos'
  ],
  'Tibabuyes': [
    'Compartir', 'El Cedro', 'Berlín', 'Bilbao', 'Lisboa', 'Toscana',
    'Verona', 'Santa Cecilia', 'Santa Rita', 'San Carlos de Suba',
    'Villa de las Flores', 'Villa Gloria', 'Cañiza', 'Carolina',
    'La Gaitana', 'La Isabela', 'Miramar', 'Nueva Tibabuyes',
    'Nuevo Corinto', 'Prados de Santa Bárbara', 'Rincón de Boyacá',
    'Sabana de Tibabuyes', 'Tibabuyes Universal'
  ],
  'Niza': [
    'Niza', 'Niza Norte', 'Niza Suba', 'Colina Campestre',
    'Lagos de Córdoba', 'Gratamira', 'Colinas de Suba',
    'Ciudad Jardín Norte', 'Las Villas', 'Córdoba', 'Covadonga',
    'Iberia', 'Calatrava', 'Campania', 'Lindaraja', 'Prado Jardín',
    'Provenza', 'Rincón de Iberia', 'Sotileza'
  ],
  'El Rincón': [
    'Alcaparros', 'Almirante Colón', 'Aures', 'Bochalema',
    'Ciudadela Cafam', 'Ciudad Hunza', 'Costa Rica', 'El Naranjal',
    'El Progreso', 'El Refugio de Suba', 'Gloria Lara',
    'La Alameda', 'La Aurora', 'La Flora', 'Lombardía',
    'Naranjos Altos', 'Rincón de Suba', 'San Isidro Norte',
    'San Jorge', 'Santa Ana de Suba', 'Toberín',
    'Villa Alexandra', 'Villa Catalina', 'Villa Elisa',
    'Villa María', 'Villas del Rincón'
  ],
  'Britalia': [
    'Britalia', 'Britalia San Diego', 'Calima Norte', 'Cantagallo',
    'Cantalejo', 'Granada Norte', 'Portales del Norte',
    'San Cipriano', 'Vista Bella'
  ],
  'San José de Bavaria': [
    'San José de Bavaria', 'Gibraltar', 'Guicani', 'Mirandela',
    'Nueva Zelandia', 'Oikos', 'San Felipe', 'Santa Catalina',
    'Villanova'
  ],
  'El Prado': [
    'Prado Veraniego', 'Prado Veraniego Norte', 'Prado Veraniego Sur',
    'Mazurén', 'La Sultana', 'Santa Helena', 'Tarragona',
    'Victoria Norte', 'Alcalá', 'Libertadores',
    'San José del Prado', 'Tierra Linda'
  ],
  'La Alhambra': [
    'Alhambra', 'Batán', 'El Recreo de los Frailes', 'Estoril',
    'Ilarco', 'Malibú', 'Mónaco', 'Pasadena', 'Puente Largo'
  ],
  'Casablanca Suba': [
    'Casa Blanca', 'Casa Blanca I', 'Casa Blanca II',
    'Casablanca Norte Suba', 'Atenas', 'Del Monte', 'El Velero'
  ],
  'La Floresta': [
    'Andes Norte', 'Club los Lagartos', 'Julio Flórez',
    'La Alborada', 'La Floresta Norte', 'Morato',
    'Nuevo Monterrey', 'Pontevedra', 'Potosí', 'Santa Rosa'
  ],
  'Guaymaral': ['Guaymaral', 'Conejera'],
  'La Academia': ['La Academia']
};

// Direcciones de referencia conocidas en Suba
const direcciones: { nombre: string; upz: string; coordenadas: [number, number] }[] = [
  // Avenidas principales
  { nombre: 'Av. Suba', upz: 'Suba Centro', coordenadas: [4.7431, -74.0740] },
  { nombre: 'Av. Ciudad de Cali', upz: 'Tibabuyes', coordenadas: [4.7250, -74.0950] },
  { nombre: 'Av. Boyacá', upz: 'Niza', coordenadas: [4.7320, -74.0620] },
  { nombre: 'Av. Calle 127', upz: 'Niza', coordenadas: [4.7180, -74.0680] },
  { nombre: 'Av. Calle 145', upz: 'Suba Centro', coordenadas: [4.7550, -74.0780] },
  { nombre: 'Av. Calle 170', upz: 'San José de Bavaria', coordenadas: [4.7620, -74.0400] },
  { nombre: 'Av. Calle 100', upz: 'La Alhambra', coordenadas: [4.6980, -74.0780] },
  { nombre: 'Av. Calle 80', upz: 'Casablanca Suba', coordenadas: [4.6850, -74.0650] },
  // Calles principales
  { nombre: 'Calle 145 # 91-19', upz: 'Suba Centro', coordenadas: [4.7431, -74.0740] },
  { nombre: 'Calle 127 # 78-10', upz: 'El Prado', coordenadas: [4.7180, -74.0680] },
  { nombre: 'Calle 127 # 56-20', upz: 'Niza', coordenadas: [4.7220, -74.0650] },
  { nombre: 'Calle 132 # 45-15', upz: 'El Rincón', coordenadas: [4.7480, -74.0580] },
  { nombre: 'Calle 165 # 18-25', upz: 'Britalia', coordenadas: [4.7550, -74.0500] },
  { nombre: 'Av. Calle 170 # 20-10', upz: 'San José de Bavaria', coordenadas: [4.7620, -74.0400] },
  { nombre: 'Av. Calle 100 # 50-30', upz: 'La Alhambra', coordenadas: [4.6980, -74.0780] },
  { nombre: 'Av. Ciudad de Cali # 152-20', upz: 'Tibabuyes', coordenadas: [4.7250, -74.0950] },
  // Centros comerciales
  { nombre: 'Centro Comercial Suba', upz: 'Suba Centro', coordenadas: [4.7431, -74.0740] },
  { nombre: 'Centro Comercial Niza', upz: 'Niza', coordenadas: [4.7220, -74.0650] },
  { nombre: 'Centro Comercial Britalia', upz: 'Britalia', coordenadas: [4.7520, -74.0500] },
  { nombre: 'Centro Comercial Bulevar Niza', upz: 'Niza', coordenadas: [4.7200, -74.0620] },
  { nombre: 'Plaza de las Américas', upz: 'Suba Centro', coordenadas: [4.6180, -74.1380] },
  // Universidades
  { nombre: 'Universidad Cooperativa de Colombia Sede Suba', upz: 'El Prado', coordenadas: [4.7180, -74.0680] },
  { nombre: 'Universidad de la Sabana', upz: 'San José de Bavaria', coordenadas: [4.8580, -74.0350] },
  // Parques
  { nombre: 'Parque Principal de Suba', upz: 'Suba Centro', coordenadas: [4.7431, -74.0740] },
  { nombre: 'Parque Tibabuyes', upz: 'Tibabuyes', coordenadas: [4.7250, -74.0950] },
  { nombre: 'Humedal de Córdoba', upz: 'Niza', coordenadas: [4.7080, -74.1050] },
  { nombre: 'Parque de los Deseos', upz: 'El Rincón', coordenadas: [4.7480, -74.0580] },
  // Hospitales
  { nombre: 'Hospital de Suba', upz: 'Suba Centro', coordenadas: [4.7430, -74.0830] },
  { nombre: 'Clínica Shaio', upz: 'La Floresta', coordenadas: [4.6900, -74.0550] },
  // Estaciones de Transmilenio
  { nombre: 'Transmilenio Suba - Calle 145', upz: 'Suba Centro', coordenadas: [4.7430, -74.0850] },
  { nombre: 'Transmilenio Suba - Av. Calle 127', upz: 'El Prado', coordenadas: [4.7180, -74.0750] },
  { nombre: 'Transmilenio Av. Suba', upz: 'Suba Centro', coordenadas: [4.7430, -74.0740] },
  // Iglesias
  { nombre: 'Iglesia de San Luis de Suba', upz: 'Suba Centro', coordenadas: [4.7431, -74.0740] },
  // Otros puntos de interés
  { nombre: 'Estación de Policía de Suba', upz: 'Suba Centro', coordenadas: [4.7440, -74.0730] },
  { nombre: 'Casa de la Cultura de Suba', upz: 'Suba Centro', coordenadas: [4.7420, -74.0750] },
  { nombre: 'Terminal de Transportes de Suba', upz: 'Tibabuyes', coordenadas: [4.7200, -74.0980] },
];

// Build the complete search dataset
export const todosLosDatosBusqueda: BusquedaItem[] = [
  // UPZs
  ...Object.keys(upzCentros).map((upz) => ({
    tipo: 'upz' as const,
    nombre: upz,
    coordenadas: upzCentros[upz],
    descripcion: `UPZ de Suba`,
  })),
  // Barrios
  ...Object.entries(barriosPorUPZ).flatMap(([upz, barrios]) =>
    barrios.map((barrio) => ({
      tipo: 'barrio' as const,
      nombre: barrio,
      upz,
      coordenadas: upzCentros[upz] || [4.7431, -74.0740],
      descripcion: `Barrio de ${upz}`,
    }))
  ),
  // Direcciones
  ...direcciones.map((d) => ({
    tipo: 'direccion' as const,
    nombre: d.nombre,
    upz: d.upz,
    coordenadas: d.coordenadas,
    descripcion: `Direccion en ${d.upz}`,
  })),
];

// Also keep the old export name for backward compatibility
export const datosBusqueda = todosLosDatosBusqueda;
