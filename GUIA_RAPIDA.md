# Guía Rápida - Peruflavor

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000
```

## 📝 Cambios Más Comunes

### Cambiar Número de WhatsApp
**Archivo:** `data/config.ts`
```typescript
whatsapp: '7817324723',  // Solo números, sin espacios
```

### Agregar un Plato Nuevo
**Archivo:** `data/dishes.ts`
```typescript
{
  id: 'mi-plato-unico',
  name: 'Mi Plato',
  description: 'Descripción...',
  price: 15,
  images: ['/media/mi-plato.jpg'],
  tags: ['Clásico'],
  isAvailableToday: true,
  isDishOfTheDay: false,  // Cambiar a true para "Plato del Día"
}
```

### Cambiar Horarios
**Archivo:** `data/config.ts`
```typescript
hours: 'Lunes a Viernes: 10:00 AM - 8:00 PM',
```

### Cambiar Zonas de Entrega
**Archivo:** `data/config.ts`
```typescript
zones: [
  'Tu zona 1',
  'Tu zona 2',
],
```

## 🖼️ Agregar Imágenes

1. Coloca la imagen en `public/media/`
2. Actualiza la ruta en `data/dishes.ts`:
   ```typescript
   images: ['/media/tu-imagen.jpg']
   ```

**Tip:** Usa nombres descriptivos y sin espacios:
- ✅ `pollo-brasa-1.jpg`
- ❌ `pollo brasa 1.jpg`

## 🎨 Cambiar Colores

**Archivo:** `tailwind.config.ts`
```typescript
colors: {
  peru: {
    red: '#TU_COLOR',  // Color principal
  },
}
```

## 📱 Probar WhatsApp

Todos los botones de WhatsApp abren automáticamente la app/web de WhatsApp con el mensaje prellenado.

**Mensajes generados:**
- Por plato: "Hola, quiero pedir [NOMBRE]. ¿Está disponible hoy?"
- General: "Hola, quiero ver el menú de hoy. ¿Qué platos tienen disponibles?"

## 🚢 Deploy

1. Sube a GitHub
2. Ve a [Vercel.com](https://vercel.com)
3. Importa proyecto
4. Deploy automático

## ⚠️ Problemas Comunes

**Imágenes no se ven:**
- Verifica que estén en `public/media/`
- Verifica la ruta en `data/dishes.ts`
- El componente mostrará un placeholder si falta la imagen

**WhatsApp no funciona:**
- Verifica el número en `data/config.ts`
- Formato: solo números, sin +, espacios o guiones

**Build falla:**
- Ejecuta `npm run build` localmente
- Revisa errores en la consola
- Verifica que todas las rutas existan

## 📞 Soporte

Revisa el `README.md` completo para más detalles.
