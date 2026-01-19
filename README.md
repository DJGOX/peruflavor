# Peruflavor - Comida Peruana Casera

Sitio web completo, responsivo y optimizado para un negocio de comida casera peruana. Diseñado mobile-first con enfoque en conversión a WhatsApp.

## 🚀 Características

- ✅ **100% Responsive** - Diseñado mobile-first, funciona perfecto en todos los dispositivos
- ✅ **Optimizado para Performance** - Lighthouse alto, imágenes optimizadas, lazy-loading
- ✅ **SEO Completo** - Meta tags, Open Graph, Twitter Cards, Schema.org, Sitemap, Robots.txt
- ✅ **WhatsApp Integration** - Botón flotante y CTAs en todas las secciones
- ✅ **TypeScript** - Código type-safe y escalable
- ✅ **Next.js 14** - App Router con Server Components
- ✅ **Tailwind CSS** - Diseño moderno y mantenible
- ✅ **Accesible** - Cumple con estándares de accesibilidad web

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn o pnpm

## 🛠️ Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias:**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo:**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
peruflavor/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal con metadata
│   ├── page.tsx           # Página de inicio
│   ├── menu/              # Páginas del menú
│   ├── contacto/          # Página de contacto
│   ├── como-funciona/     # Página de cómo funciona
│   ├── sitemap.ts         # Generación de sitemap
│   └── robots.ts          # Configuración de robots.txt
├── components/            # Componentes React reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── DishCard.tsx
│   ├── DishModal.tsx
│   └── ImageWithFallback.tsx
├── data/                  # Datos del sitio
│   ├── dishes.ts          # Lista de platos
│   └── config.ts          # Configuración del sitio
├── lib/                   # Utilidades
│   └── utils.ts           # Funciones helper
├── types/                 # Tipos TypeScript
│   └── index.ts
└── public/                # Archivos estáticos
    └── media/             # Imágenes y videos de platos
```

## ✏️ Cómo Modificar el Contenido

### Cambiar Platos del Menú

Edita el archivo `data/dishes.ts`:

```typescript
{
  id: 'nombre-unico',
  name: 'Nombre del Plato',
  description: 'Descripción del plato...',
  price: 15,                    // Opcional
  currency: 'USD',             // Opcional
  images: ['/media/plato-1.jpg', '/media/plato-2.jpg'],
  videoUrl: 'https://...',     // Opcional
  tags: ['Clásico', 'Picante'],
  ingredients: ['Ingrediente 1', 'Ingrediente 2'],
  notes: 'Notas adicionales',  // Opcional
  isAvailableToday: true,
  isDishOfTheDay: true,        // Para "Platos del Día"
}
```

### Cambiar Platos del Día

En `data/dishes.ts`, marca los platos que quieres mostrar como "Platos del Día" con:
```typescript
isDishOfTheDay: true
```

### Cambiar Información de Contacto

Edita `data/config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: 'Peruflavor',
  tagline: 'Comida Peruana Casera',
  description: 'Tu descripción...',
  contact: {
    whatsapp: '7817324723',              // Solo números
    whatsappFormatted: '+1 781-732-4723', // Formato legible
    hours: 'Lunes a Domingo: 11:00 AM - 9:00 PM',
    zones: [
      'Zona 1',
      'Zona 2',
      // ...
    ],
  },
}
```

### Agregar Imágenes y Videos

1. Coloca las imágenes en `public/media/`
2. Actualiza las rutas en `data/dishes.ts`:
   ```typescript
   images: ['/media/tu-imagen.jpg']
   ```
3. Para videos, usa URLs de YouTube/Vimeo o coloca el archivo en `public/media/` y referencia con `/media/tu-video.mp4`

**Recomendaciones:**
- Formato: JPG/WebP para imágenes, MP4 para videos
- Tamaño: 1200x800px para imágenes principales
- Optimiza las imágenes antes de subirlas (usa herramientas como TinyPNG)

## 🚢 Deploy en Vercel

1. **Sube tu código a GitHub/GitLab/Bitbucket**

2. **Ve a [Vercel](https://vercel.com) y crea una cuenta**

3. **Importa tu proyecto:**
   - Click en "New Project"
   - Conecta tu repositorio
   - Vercel detectará automáticamente Next.js

4. **Configuración (opcional):**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Deploy:**
   - Click en "Deploy"
   - Espera a que termine el build
   - Tu sitio estará disponible en `tu-proyecto.vercel.app`

6. **Dominio personalizado (opcional):**
   - Ve a Settings > Domains
   - Agrega tu dominio personalizado

## 🔧 Configuración Adicional

### Cambiar el Dominio en SEO

Edita `app/layout.tsx` y `app/sitemap.ts`:
- Reemplaza `https://peruflavor.com` con tu dominio real

### Headers de Seguridad

Ya están configurados en `next.config.js`. Puedes agregar más según necesites.

### Variables de Entorno (Futuro)

Si necesitas variables de entorno, crea `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## 📱 WhatsApp

El número de WhatsApp está configurado en `data/config.ts`. Todos los botones y enlaces se generan automáticamente.

**Formato del mensaje:**
- Por plato: "Hola, quiero pedir [NOMBRE_DEL_PLATO]. ¿Está disponible hoy?"
- General: "Hola, quiero ver el menú de hoy. ¿Qué platos tienen disponibles?"

## 🎨 Personalización de Estilos

Los colores principales están en `tailwind.config.ts`:
```typescript
colors: {
  peru: {
    red: '#DC143C',
    white: '#FFFFFF',
    gold: '#FFD700',
  },
}
```

Los estilos globales están en `app/globals.css`.

## 🔮 Escalabilidad Futura

El proyecto está preparado para:

- **CMS Integration**: Puedes conectar Sanity, Contentful o Strapi
- **Base de Datos**: Estructura lista para agregar Prisma/MongoDB
- **API Routes**: Next.js API routes listos para usar
- **App Mobile**: La estructura permite extraer lógica a una API para app nativa

### Migrar a CMS (Ejemplo con Sanity)

1. Instala Sanity: `npm install @sanity/client`
2. Crea un schema para `Dish`
3. Reemplaza `data/dishes.ts` con llamadas a Sanity
4. Mantén los tipos TypeScript existentes

## 🐛 Solución de Problemas

### Error de imágenes no encontradas
- Verifica que las rutas en `data/dishes.ts` sean correctas
- Asegúrate de que las imágenes estén en `public/media/`
- El componente `ImageWithFallback` mostrará un placeholder si la imagen no existe

### WhatsApp no abre
- Verifica el número en `data/config.ts`
- Formato correcto: solo números sin espacios ni guiones

### Build falla
- Ejecuta `npm run build` localmente para ver errores
- Verifica que todas las rutas de imágenes existan
- Revisa la consola para errores de TypeScript

## 📄 Licencia

Este proyecto es privado y propiedad de Peruflavor.

## 📞 Soporte

Para preguntas o soporte, contacta al desarrollador o revisa la documentación de [Next.js](https://nextjs.org/docs).

---

**Desarrollado con ❤️ para Peruflavor**
