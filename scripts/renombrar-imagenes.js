const fs = require('fs');
const path = require('path');

// Mapeo basado en las descripciones de imágenes que compartiste
// Necesitarás revisar visualmente y ajustar este mapeo
const mapeoImagenes = {
  // Ceviches
  'ceviche': ['ceviche-1.jpg', 'ceviche-2.jpg'],
  'ceviche-mixto': ['ceviche-mixto-1.jpg'],
  'ceviche-conchas-negras': ['ceviche-conchas-negras-1.jpg'],
  'jalea-mixta': ['jalea-mixta-1.jpg'],
  'arroz-mariscos': ['arroz-mariscos-1.jpg'],
  'chaufa-mariscos': ['chaufa-mariscos-1.jpg'],
  'parihuela-mixta': ['parihuela-mixta-1.jpg'],
  'pescado-macho': ['pescado-macho-1.jpg'],
  'pescado-frito': ['pescado-frito-1.jpg'],
  'leche-tigre': ['leche-tigre-1.jpg'],
  
  // Carnes
  'lomo-saltado': ['lomo-saltado-1.jpg', 'lomo-saltado-2.jpg'],
  'pollo-broaster': ['pollo-broaster-1.jpg'],
  'chicharron-pollo': ['chicharron-pollo-1.jpg'],
  'chicharron-chancho': ['chicharron-chancho-1.jpg'],
  'seco-res': ['seco-res-1.jpg'],
  'aji-gallina': ['aji-gallina-1.jpg'],
  'anticuchos': ['anticuchos-1.jpg'],
  'cuy-chactado': ['cuy-chactado-1.jpg'],
  
  // Arroces y Pastas
  'arroz-chaufa': ['arroz-chaufa-1.jpg'],
  'arroz-pato-huancaina': ['arroz-pato-huancaina-1.jpeg'], // Ya renombrado
  'tallarines-verdes': ['tallarines-verdes-1.jpg'],
  'tallarines-rojos-huancaina': ['tallarines-rojos-1.jpg'],
  
  // Otros
  'papa-huancaina': ['papa-huancaina-1.jpg'],
  'carapulcra': ['carapulcra-1.jpg'],
  'mostrito': ['mostrito-1.jpg'],
  'tamales': ['tamales-1.jpg'],
  'causa-chiclayana': ['causa-chiclayana-1.jpg'],
  'causa-chiclayana-ceviche': ['causa-ceviche-1.jpg'],
  'causa-chiclayana-sola': ['causa-chiclayana-sola-1.jpg'],
  
  // Sopas
  'sopa-semola': ['sopa-semola-1.jpg'],
  'sopa-pollo': ['sopa-pollo-1.jpg'],
  'chupe-verde': ['chupe-verde-1.jpg'],
  
  // Postres
  'picarones': ['picarones-1.jpg'],
  'mazamorra-morada': ['mazamorra-morada-1.jpg'],
  'arroz-leche': ['arroz-leche-1.jpg'],
};

const mediaDir = path.join(__dirname, '../public/media');

// Listar todas las imágenes con UUID
function listarImagenesUUID() {
  const archivos = fs.readdirSync(mediaDir);
  return archivos.filter(archivo => {
    const ext = path.extname(archivo).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && 
           !archivo.includes('-1.') && 
           !archivo.includes('-2.') &&
           archivo !== 'INSTRUCCIONES_IMAGENES.md';
  });
}

console.log('Imágenes con UUID que necesitan ser renombradas:');
const imagenesUUID = listarImagenesUUID();
imagenesUUID.forEach((img, index) => {
  console.log(`${index + 1}. ${img}`);
});

console.log('\nTotal de imágenes a identificar:', imagenesUUID.length);
console.log('\nPara renombrar, necesitas:');
console.log('1. Revisar visualmente cada imagen');
console.log('2. Identificar qué plato representa');
console.log('3. Usar el comando: mv "nombre-uuid.JPG" "nombre-plato-1.jpg"');
