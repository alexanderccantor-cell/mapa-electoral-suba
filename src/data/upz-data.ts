import type { UPZ } from '@/types';

// Coordenadas aproximadas de los polígonos de las UPZ de Suba
// Basadas en información geográfica pública de la localidad

export const upzData: UPZ[] = [
  {
    id: 'suba-centro',
    nombre: 'Suba Centro',
    colorNeon: '#00f3ff',
    barrios: [
      'Suba Centro', 'El Pórtico', 'El Pinar', 'Tuna Alta', 'Tuna Baja',
      'Prados de Suba', 'Villa del Campo', 'Costa Azul', 'Santa Isabel',
      'San Francisco', 'Bosques de San Jorge', 'El Salitre', 'Alcázar de Suba',
      'Almendros Norte', 'Campanela', 'La Fontana', 'La Campiña', 'Java',
      'Las Orquídeas', 'Londres', 'Miraflores', 'Navetas', 'Portal de Las Mercedes',
      'Almendros de Suba', 'Las Flores', 'Pradera de Suba', 'Rincón de Santa Inés',
      'Turingia', 'Villa Esperanza', 'Villa Hermosa', 'Villa Susana', 'El Pencil',
      'Los Lagos', 'Alto de la Toma', 'Acacias', 'Alaska', 'Gloria Lara',
      'Monarcas', 'Prados de Suba', 'El Pórtico', 'El Pinar', 'Bosques de San Jorge'
    ],
    coordenadasLimite: [
      [4.755, -74.085], [4.755, -74.070], [4.745, -74.065],
      [4.735, -74.070], [4.730, -74.080], [4.735, -74.090],
      [4.745, -74.095], [4.755, -74.085]
    ]
  },
  {
    id: 'tibabuyes',
    nombre: 'Tibabuyes',
    colorNeon: '#ff0055',
    barrios: [
      'Compartir', 'El Cedro', 'Berlín', 'Bilbao', 'Lisboa', 'Toscana',
      'Verona', 'Santa Cecilia', 'Santa Rita', 'San Carlos de Suba',
      'Villa de las Flores', 'Villa Gloria', 'Villa Cindy', 'Cañiza I',
      'Cañiza II', 'Cañiza III', 'Carolina II', 'Carolina III', 'La Gaitana',
      'La Isabela', 'Miramar', 'Nueva Tibabuyes', 'Nuevo Corinto',
      'Prados de Santa Bárbara', 'Rincón de Boyacá', 'Sabana de Tibabuyes',
      'San Carlos de Tibabuyes', 'San Pedro de Tibabuyes', 'Tibabuyes Universal',
      'Vereda Suba-Rincón', 'Vereda Tibabuyes', 'Los Nogales de Tibabuyes'
    ],
    coordenadasLimite: [
      [4.735, -74.095], [4.740, -74.105], [4.725, -74.110],
      [4.715, -74.105], [4.710, -74.095], [4.715, -74.085],
      [4.725, -74.085], [4.735, -74.095]
    ]
  },
  {
    id: 'niza',
    nombre: 'Niza',
    colorNeon: '#00ff88',
    barrios: [
      'Niza', 'Niza Norte', 'Niza Suba', 'Colina Campestre', 'Lagos de Córdoba',
      'Gratamira', 'Colinas de Suba', 'Ciudad Jardín Norte', 'Las Villas',
      'Córdoba', 'Covadonga', 'Iberia', 'Calatrava', 'Campania', 'Lindaraja',
      'Niza VIII', 'Prado Jardín', 'Provenza', 'Rincón de Iberia', 'Sotileza'
    ],
    coordenadasLimite: [
      [4.735, -74.070], [4.740, -74.055], [4.725, -74.050],
      [4.710, -74.055], [4.705, -74.065], [4.710, -74.075],
      [4.720, -74.080], [4.735, -74.070]
    ]
  },
  {
    id: 'el-rincon',
    nombre: 'El Rincón',
    colorNeon: '#ffaa00',
    barrios: [
      'Alcaparros', 'Almirante Colón', 'Almonacid', 'Altos de Chozica',
      'Altos de la Esperanza', 'Amberes', 'Antonio Granados', 'Arrayanes',
      'Aures', 'Bochalema', 'Catalina', 'Ciudad Hunza', 'Ciudadela Cafam',
      'Costa Azul', 'Costa Rica', 'El Aguinaldo', 'El Arenal', 'El Cerezo',
      'El Cóndor', 'El Jordan-La Esperanza', 'El Naranjal', 'El Palmar',
      'El Progreso', 'El Refugio de Suba', 'El Rubí', 'El Tabor',
      'Gloria Lara de Echeverri', 'Guillermo Núñez', 'Jaime Bermeo', 'Japón',
      'Java II Sector', 'La Aguadita', 'La Alameda', 'La Aurora', 'La Chucua',
      'La Esmeralda', 'La Estanzuela', 'La Flor', 'La Flora', 'La Manuelita',
      'La Palma', 'Lagos de Suba', 'Las Flores', 'Lombardía', 'Los Arrayanes',
      'Los Naranjos', 'Los Nogales', 'Naranjos Altos', 'Palma Aldea',
      'Potrerillo', 'Prados de Santa Bárbara', 'Puerta del Sol',
      'Rincón de Suba', 'Rincón El Cóndor', 'Rincón-Escuela', 'Riobamba',
      'Rodrigo Lara Bonilla', 'San Cayetano', 'San Isidro Norte', 'San Jorge',
      'San Miguel', 'San Pedro', 'Santa Ana de Suba', 'Toberín',
      'Telecom Arrayanes', 'Teusaquillo de Suba', 'Trinitaria',
      'Villa Alexandra', 'Villa Catalina', 'Villa Elisa', 'Villa María',
      'Villas del Rincón', 'El Carmen', 'El Poa', 'El Ocal',
      'Altos de la Esperanza', 'Arrayanes'
    ],
    coordenadasLimite: [
      [4.755, -74.070], [4.760, -74.055], [4.745, -74.050],
      [4.730, -74.055], [4.725, -74.065], [4.730, -74.075],
      [4.740, -74.075], [4.755, -74.070]
    ]
  },
  {
    id: 'britalia',
    nombre: 'Britalia',
    colorNeon: '#aa00ff',
    barrios: [
      'Britalia', 'Britalia San Diego', 'Calima Norte', 'Cantagallo',
      'Cantalejo', 'El Paraíso de los 12 Apóstoles', 'Gilmar', 'Granada Norte',
      'Granjas de Namur', 'La Chocita', 'Los Eliseos', 'Pijao de Oro',
      'Portales del Norte', 'San Cipriano', 'Villa Delia', 'Vista Bella'
    ],
    coordenadasLimite: [
      [4.760, -74.055], [4.765, -74.045], [4.750, -74.040],
      [4.740, -74.045], [4.735, -74.055], [4.740, -74.060],
      [4.750, -74.060], [4.760, -74.055]
    ]
  },
  {
    id: 'san-jose-bavaria',
    nombre: 'San José de Bavaria',
    colorNeon: '#ff5577',
    barrios: [
      'San José de Bavaria', 'Gibraltar', 'Guicani', 'Mirandela',
      'Nueva Zelandia', 'Oikos', 'San Felipe', 'Santa Catalina',
      'Tejares del Norte', 'Villanova', 'Villa del Prado', 'Villa Lucy'
    ],
    coordenadasLimite: [
      [4.765, -74.045], [4.770, -74.035], [4.760, -74.030],
      [4.750, -74.035], [4.745, -74.040], [4.750, -74.050],
      [4.760, -74.050], [4.765, -74.045]
    ]
  },
  {
    id: 'el-prado',
    nombre: 'El Prado',
    colorNeon: '#55ff00',
    barrios: [
      'Prado Veraniego', 'Prado Veraniego Norte', 'Prado Veraniego Sur',
      'Mazurén', 'La Sultana', 'Santa Helena', 'Tarragona', 'Victoria Norte',
      'Alcalá', 'Atabanza', 'Bernal y Forero', 'Cacihia', 'Canodromo',
      'Libertadores', 'Los Prados de La Sultana', 'Madeira',
      'Manuela Arluz', 'Niza IX', 'Prado Pinzón', 'Prado Sur',
      'San José del Spring', 'San José del Prado', 'Tierra Linda',
      'Villa Morena'
    ],
    coordenadasLimite: [
      [4.730, -74.075], [4.735, -74.060], [4.720, -74.055],
      [4.705, -74.060], [4.700, -74.070], [4.705, -74.080],
      [4.715, -74.085], [4.730, -74.075]
    ]
  },
  {
    id: 'la-alhambra',
    nombre: 'La Alhambra',
    colorNeon: '#ff5555',
    barrios: [
      'Alhambra', 'Batán', 'El Recreo de los Frailes', 'Estoril',
      'Ilarco', 'Malibú', 'Mónaco', 'Pasadena', 'Puente Largo'
    ],
    coordenadasLimite: [
      [4.710, -74.085], [4.715, -74.070], [4.700, -74.065],
      [4.690, -74.070], [4.685, -74.080], [4.690, -74.090],
      [4.700, -74.095], [4.710, -74.085]
    ]
  },
  {
    id: 'casablanca',
    nombre: 'Casablanca Suba',
    colorNeon: '#55ffff',
    barrios: [
      'Casa Blanca I', 'Casa Blanca II', 'Casablanca Norte Suba',
      'Atenas', 'Catalayud', 'Del Monte', 'El Velero', 'Escuela de Carabineros'
    ],
    coordenadasLimite: [
      [4.705, -74.065], [4.710, -74.050], [4.695, -74.045],
      [4.680, -74.050], [4.675, -74.060], [4.680, -74.070],
      [4.690, -74.075], [4.705, -74.065]
    ]
  },
  {
    id: 'la-floresta',
    nombre: 'La Floresta',
    colorNeon: '#ffff55',
    barrios: [
      'Andes Norte', 'Club los Lagartos', 'Coasmedas', 'Julio Flórez',
      'La Alborada', 'La Floresta Norte', 'Morato', 'Nuevo Monterrey',
      'Pontevedra', 'Potosí', 'Santa Rosa', 'San Nicolás', 'Teusacá'
    ],
    coordenadasLimite: [
      [4.705, -74.050], [4.710, -74.035], [4.695, -74.030],
      [4.680, -74.035], [4.675, -74.045], [4.680, -74.055],
      [4.690, -74.060], [4.705, -74.050]
    ]
  },
  {
    id: 'guaymaral',
    nombre: 'Guaymaral',
    colorNeon: '#ff55ff',
    barrios: ['Guaymaral', 'Conejera'],
    coordenadasLimite: [
      [4.790, -74.050], [4.795, -74.040], [4.785, -74.035],
      [4.775, -74.040], [4.770, -74.050], [4.775, -74.060],
      [4.785, -74.060], [4.790, -74.050]
    ]
  },
  {
    id: 'la-academia',
    nombre: 'La Academia',
    colorNeon: '#55aaff',
    barrios: ['La Academia'],
    coordenadasLimite: [
      [4.780, -74.035], [4.785, -74.025], [4.775, -74.020],
      [4.765, -74.025], [4.760, -74.035], [4.765, -74.045],
      [4.775, -74.045], [4.780, -74.035]
    ]
  }
];

// Centro aproximado de cada UPZ para el flyTo
export const upzCentros: Record<string, [number, number]> = {
  'Suba Centro': [4.742, -74.078],
  'Tibabuyes': [4.722, -74.095],
  'Niza': [4.722, -74.065],
  'El Rincón': [4.742, -74.060],
  'Britalia': [4.752, -74.050],
  'San José de Bavaria': [4.760, -74.040],
  'El Prado': [4.718, -74.068],
  'La Alhambra': [4.698, -74.078],
  'Casablanca Suba': [4.692, -74.058],
  'La Floresta': [4.692, -74.042],
  'Guaymaral': [4.782, -74.048],
  'La Academia': [4.772, -74.032]
};

// Datos de búsqueda predefinidos
export const datosBusqueda = upzData.flatMap((upz) => [
  {
    tipo: 'upz' as const,
    nombre: upz.nombre,
    coordenadas: upzCentros[upz.nombre] || [4.7431, -74.0740],
    descripcion: `UPZ de Suba - ${upz.barrios.length} barrios`
  },
  ...upz.barrios.slice(0, 8).map((barrio) => ({
    tipo: 'barrio' as const,
    nombre: barrio,
    upz: upz.nombre,
    coordenadas: upzCentros[upz.nombre] || [4.7431, -74.0740],
    descripcion: `Barrio de ${upz.nombre}`
  }))
]);
