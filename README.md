# Advertisement Marketplace

Aplicación web desarrollada con **Next.js 16**, **TypeScript**, **Prisma** y **Supabase** para la gestión de anuncios de segunda mano.

## Características

- Autenticación mediante sesiones.
- Listado de anuncios.
- Búsqueda por título.
- Crear anuncios (usuarios autenticados).
- Editar anuncios (solo el propietario).
- Eliminar anuncios (solo el propietario).
- Favoritos con Optimistic UI (`useOptimistic`).
- Middleware de protección para rutas privadas.
- Validación de formularios con Zod.
- Error Boundaries y páginas de error personalizadas.
- Loading UI.
- Tests con Vitest.

## Tecnologías utilizadas

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Tailwind CSS
- Zod
- Vitest

## Funcionalidades implementadas

### Autenticación

- Inicio de sesión.
- Cierre de sesión.
- Protección mediante Middleware.
- Protección de Server Actions.

### Gestión de anuncios

- Crear anuncios.
- Editar anuncios.
- Eliminar anuncios.
- Buscar anuncios.
- Visualizar detalle del anuncio.

### Funcionalidades avanzadas

- Optimistic UI para favoritos.
- Error Boundaries (`error.tsx` y `global-error.tsx`).
- Página `not-found`.
- Loading UI.
- Revalidación de caché mediante `revalidatePath()`.

## Testing

Los tests se ejecutan mediante:

```bash
npm test
```

Actualmente se incluyen tests para la validación de creación de anuncios.

## Autor

Laura Guillén Toman
