# 🚀 Instrucciones de Configuración de Supabase

## ⚠️ Error Actual
Si ves el error: `Could not find the table 'public.tenants'`, significa que el schema no se ha ejecutado en tu proyecto de Supabase.

## 📋 Pasos para Configurar la Base de Datos

### Paso 1: Crear Proyecto en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Crea un nuevo proyecto
4. Espera a que el proyecto esté listo (2-3 minutos)

### Paso 2: Obtener Credenciales
1. En el dashboard de Supabase, ve a **Settings** → **API**
2. Copia estos valores:
   - **Project URL** (ej: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (opcional, para operaciones admin)

### Paso 3: Configurar Variables de Entorno
Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
MOCK_TENANT_ID=00000000-0000-0000-0000-000000000000
```

### Paso 4: Ejecutar el Schema SQL ⭐ **IMPORTANTE**

#### Opción A: Desde el Dashboard (Recomendado)
1. Ve a **SQL Editor** en el dashboard de Supabase
2. Haz clic en **New Query**
3. Abre el archivo `supabase/schema.sql` de este proyecto
4. Copia **TODO** el contenido del archivo
5. Pégalo en el editor SQL
6. Haz clic en **Run** (o presiona Cmd/Ctrl + Enter)
7. Verifica que veas mensajes de éxito para cada tabla creada

#### Opción B: Usando Supabase CLI
```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar sesión
supabase login

# Vincular proyecto
supabase link --project-ref tu-project-ref

# Ejecutar migración
supabase db push
```

### Paso 5: Verificar que las Tablas se Crearon
1. Ve a **Table Editor** en Supabase
2. Deberías ver estas tablas:
   - ✅ `tenants`
   - ✅ `products`
   - ✅ `orders`
   - ✅ `order_items`

### Paso 6: Habilitar Realtime (Para el KDS)
1. Ve a **Database** → **Replication**
2. Habilita la replicación para la tabla `orders`
3. Esto permite que el sistema de pedidos funcione en tiempo real

### Paso 7: Crear un Tenant de Prueba
Ejecuta este SQL en el SQL Editor:

```sql
-- Primero, necesitas un usuario de autenticación
-- Si no tienes uno, crea uno en Authentication → Users

-- Luego, inserta un tenant de prueba
-- Reemplaza 'TU-USER-ID-AQUI' con el ID de un usuario de auth.users
INSERT INTO tenants (name, slug, owner_id, brand_color)
VALUES (
  'Mi Restaurante',
  'mi-restaurante',
  'TU-USER-ID-AQUI', -- Reemplaza esto
  '#FF5F1F'
);

-- Actualiza MOCK_TENANT_ID en .env.local con el ID del tenant creado
```

## 🔍 Verificación

Después de ejecutar el schema, verifica:

1. **Tablas creadas**: Ve a Table Editor
2. **RLS habilitado**: Ve a Authentication → Policies
3. **Realtime activo**: Ve a Database → Replication

## 🐛 Solución de Problemas

### Error: "relation does not exist"
- El schema no se ejecutó completamente
- Vuelve a ejecutar `schema.sql` desde el principio

### Error: "permission denied"
- Verifica que estés usando la clave `anon` correcta
- Revisa las políticas RLS en Authentication → Policies

### Error: "duplicate key"
- Algunas tablas ya existen
- Puedes eliminar las tablas y volver a ejecutar el schema, o
- Ejecuta solo las partes que faltan

## 📞 Siguiente Paso

Una vez que el schema esté ejecutado:
1. Reinicia el servidor Next.js
2. Visita http://localhost:3000/marketing
3. Prueba crear un producto en `/app/menu`
