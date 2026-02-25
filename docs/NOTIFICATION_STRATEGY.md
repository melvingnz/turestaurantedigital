# Estrategia de notificaciones – Tu Restaurante Digital

Este documento describe cómo se notifica al **cliente** y al **restaurante** cuando se realiza un pedido, y opciones para ampliar la estrategia.

---

## 1. Flujo actual

### Cliente

- **Confirmación de pedido por correo**
  - **Cuándo:** Al completar un pedido en checkout, si el cliente ingresó un **correo** en el campo "Contacto" (email o teléfono).
  - **Condición:** Solo se envía si la orden tiene `customer_email` (cuando "Contacto" es un email).
  - **Contenido:** Asunto "Confirmación de pedido #XXXX – [Nombre del restaurante]". Cuerpo: agradecimiento, resumen del pedido (ítems, subtotal, envío 0, impuestos 0, total como **DOP $Monto**), método de pago (entrega/recoger), botones "Ver tu pedido" y "Visita nuestra tienda".
  - **Tecnología:** Resend (`RESEND_API_KEY`, `RESEND_FROM`). Plantilla HTML en `app/actions/send-order-emails.ts` → `buildOrderConfirmationHtml`.
  - **Trigger:** Después de crear la orden y los ítems en `placeOrder`; se llama en segundo plano para no bloquear la respuesta.

### Restaurante

- **Notificación de nuevo pedido por correo**
  - **Cuándo:** Siempre que se crea un pedido.
  - **Destinatario:** Email del **dueño del tenant** (usuario con `owner_id` en `tenants`). Se obtiene con Supabase Auth Admin: `getUserById(tenant.owner_id)`.
  - **Contenido:** Asunto "Nuevo pedido #XXXX – [Nombre del restaurante]". Cuerpo: cliente, contacto, tipo de pedido, lista de ítems, total (DOP $Monto), botón "Ver pedidos" (enlace a `/app/orders`).
  - **Tecnología:** Resend + Supabase Admin (service role) para leer el email del owner.
  - **Trigger:** Igual que la confirmación al cliente; en segundo plano desde `placeOrder`.

---

## 2. Variables de entorno

- **RESEND_API_KEY:** obligatoria para enviar cualquier correo.
- **RESEND_FROM:** remitente (ej. `Tu Restaurante Digital <noreply@turestaurantedigital.com>`).
- **NEXT_PUBLIC_APP_URL:** URL base de la app (para enlaces "Ver tu pedido", "Visita nuestra tienda", "Ver pedidos"). Si no está definida, se usa `https://turestaurantedigital.com`.
- **SUPABASE_SERVICE_ROLE_KEY:** necesaria para que el backend obtenga el email del dueño del restaurante (Auth Admin).

---

## 3. Base de datos

- **orders.customer_email** (opcional): si el cliente escribe un email en "Contacto" en checkout, se guarda aquí y se usa como destinatario del correo de confirmación. Si solo escribe teléfono, no se envía correo al cliente.
- Migración: `supabase/migrations/add_orders_customer_email.sql`.

---

## 4. Posibles ampliaciones

### Restaurante

- **Varios destinatarios:** Añadir en `tenants` un campo `notification_emails` (array o texto separado por comas) y enviar el "Nuevo pedido" a todos.
- **WhatsApp al restaurante:** Si tienes número del restaurante (o del dueño), integrar con WhatsApp Business API o un servicio tipo Twilio para enviar "Nuevo pedido #X – Total: DOP $Y" por WhatsApp.
- **Notificaciones in-app:** En el panel del restaurante (`/app/orders`), mostrar badge o lista de "pedidos nuevos" (por ejemplo, estado `pending` y `created_at` reciente) o usar polling/WebSocket para actualizar en tiempo real.
- **Resumen diario:** Job cron que envíe un correo al restaurante con el resumen del día (pedidos, totales).

### Cliente

- **SMS:** Si en checkout se captura solo teléfono, enviar un SMS corto de confirmación ("Tu pedido #X en [Restaurante] fue recibido. Total DOP $Y") con un proveedor (Twilio, etc.).
- **Estado del pedido:** Cuando el restaurante cambie el estado (preparando, listo, entregado), enviar correo o SMS al cliente: "Tu pedido está en camino", "Tu pedido está listo para recoger", etc.

### Operativo

- **Reintentos:** Si Resend falla, guardar en una tabla `email_queue` (order_id, type, payload, attempts) y un job que reintente.
- **Logs:** Los envíos ya se registran con `logger.info` / `logger.error` en `send-order-emails.ts`; se puede centralizar en un panel de soporte si hace falta.

---

## 5. Resumen

| Evento           | Quién recibe        | Canal   | Condición / Notas                          |
|------------------|---------------------|---------|--------------------------------------------|
| Pedido creado    | Cliente             | Email   | Solo si `customer_email` está informado    |
| Pedido creado    | Restaurante (owner) | Email   | Siempre; email vía Auth Admin              |

---

## 6. Archivos implicados

- **app/actions/send-order-emails.ts:** envío de ambos correos y plantillas HTML (confirmación al cliente, notificación al restaurante).
- **app/actions/orders.ts:** llamada en segundo plano a `sendOrderConfirmationEmail` y `sendNewOrderNotificationToRestaurant` tras crear la orden.
- **components/storefront/checkout-form.tsx:** guarda `customer_email` cuando el campo Contacto es un email.
- **supabase/migrations/add_orders_customer_email.sql:** añade la columna opcional `customer_email` a `orders`.
