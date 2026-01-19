const fs = require('fs');
const path = require('path');

// Lee el mapeo
const mapeoPath = path.join(__dirname, 'mapeo-imagenes.json');
const mapeo = JSON.parse(fs.readFileSync(mapeoPath, 'utf8'));

const mediaDir = path.join(__dirname, '../public/media');

// Contador para imágenes duplicadas del mismo plato
const contadores = {};

function renombrarImagenes() {
  let renombradas = 0;
  let errores = 0;

  for (const [uuid, nombrePlato] of Object.entries(mapeo.mapeo)) {
    if (!nombrePlato || nombrePlato.trim() === '') {
      continue; // Saltar si no tiene mapeo
    }

    const archivoOriginal = path.join(mediaDir, uuid);
    
    if (!fs.existsSync(archivoOriginal)) {
      console.log(`⚠️  No existe: ${uuid}`);
      continue;
    }

    // Determinar extensión
    const ext = path.extname(uuid).toLowerCase();
    const nuevaExt = ext === '.jpeg' ? '.jpeg' : '.jpg';

    // Contar cuántas imágenes del mismo plato ya existen
    if (!contadores[nombrePlato]) {
      contadores[nombrePlato] = 1;
    } else {
      contadores[nombrePlato]++;
    }

    const numero = contadores[nombrePlato] > 1 ? `-${contadores[nombrePlato]}` : '';
    const nuevoNombre = `${nombrePlato}${numero}${nuevaExt}`;
    const archivoNuevo = path.join(mediaDir, nuevoNombre);

    try {
      // Verificar si el archivo destino ya existe
      if (fs.existsSync(archivoNuevo)) {
        console.log(`⚠️  Ya existe: ${nuevoNombre}, saltando...`);
        continue;
      }

      fs.renameSync(archivoOriginal, archivoNuevo);
      console.log(`✅ ${uuid} → ${nuevoNombre}`);
      renombradas++;
    } catch (error) {
      console.error(`❌ Error renombrando ${uuid}:`, error.message);
      errores++;
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Renombradas: ${renombradas}`);
  console.log(`   ❌ Errores: ${errores}`);
}

// Ejecutar
console.log('🚀 Iniciando renombrado de imágenes...\n');
renombrarImagenes();
