# Estrategia de pagos: CardNet y Azul (República Dominicana)

Este documento resume las opciones para integrar **tarjeta de crédito/débito** y **depósito bancario** en Tu Restaurante Digital, con CardNet y Azul como pasarelas locales.

---

## 1. Resumen de opciones

| Aspecto | CardNet | Azul |
|--------|---------|------|
| **Operador** | CardNet (Visa/Mastercard en RD) | Servicios Digitales Popular (Banco Popular) |
| **Documentación** | [developers.cardnet.com.do](https://developers.cardnet.com.do/) — guías claras (REST y POST/3DS) | Web service JSON; menos documentación pública |
| **Tarjetas** | Visa, Mastercard | Visa, Mastercard (y opciones Popular/tPago) |
| **Monedas** | DOP, USD | DOP (y USD según contrato) |
| **Comisiones (referencia)** | ~5% Visa/Mastercard (confirmar con ejecutivo) | Negociable con el banco; contactar a Azul |
| **API REST** | Sí (Ztrans: `https://ecommerce.cardnet.com.do/api/payment`) | Sí (`https://pagos.azul.com.do/webservices/JSON/Default.aspx`) |
| **Página de pago hospedada** | Sí (POST + 3DS — redirección a CardNet) | Sí (“Payment Page” — integración sencilla) |
| **Requisitos técnicos** | TLS 1.2, `merchant-id`, `terminal-id`, certificados en prod | Auth1/Auth2, certificados SSL (azul_cert.pem, ssl_key_cert.pem) |

---

## 2. Dos estrategias de integración

### A) Página de pago hospedada (recomendada para empezar)

- El usuario paga en **una página del proveedor** (CardNet o Azul).
- Tu backend genera un link o formulario con: monto, referencia (orden), moneda, URLs de retorno/callback.
- **Ventajas:**  
  - No manejas datos de tarjeta → **fuera de alcance PCI-DSS** en tu app.  
  - Menos desarrollo y mantenimiento.  
  - 3DS y seguridad gestionados por la pasarela.
- **Desventajas:**  
  - El usuario sale de tu dominio (experiencia menos “nativa”).  
  - Menos control sobre el flujo visual.

**CardNet:** “Integración con Pantalla (POST - 3DS)” — redirección al gateway de CardNet, luego vuelta a tu URL de confirmación.  
**Azul:** “Payment Page” — flujo similar; documentación y parámetros se obtienen al contratar.

### B) Integración directa (API / “sin pantalla”)

- Tu frontend o backend envían a la API de CardNet/Azul: número de tarjeta, vencimiento, CVV, monto, etc.
- **Ventajas:**  
  - Experiencia 100% en tu sitio.  
  - Diseño del flujo a tu medida.
- **Desventajas:**  
  - Entras en **alcance PCI-DSS** (si las tarjetas pasan por tu servidor o por JS que controlas).  
  - Necesitas tokenización o campos iframe del proveedor para no tocar datos sensibles.  
  - Más desarrollo, certificados y pruebas.

**CardNet:** “Integración sin Pantalla (REST)” — Ztrans: primero `CreateIdempotencyKey`, luego `Process Sale` con datos de tarjeta (o token).  
**Azul:** Web service JSON con Auth1/Auth2; ejemplos en PHP/Python (Gist, pyazul); para Node/Next hay que adaptar.

---

## 3. Depósito bancario

- **No requiere** CardNet ni Azul.
- Flujo típico:
  1. El cliente elige “Depósito bancario” en checkout.
  2. Se crea la orden en estado “pendiente de pago” o “esperando transferencia”.
  3. Se muestra en pantalla (y/o por email) los datos bancarios del restaurante: banco, cuenta, referencia (número de orden), monto.
  4. El cliente hace la transferencia.
  5. El restaurante confirma el pago en el panel de administración y se cambia el estado a “pagado” / “confirmado”.

Implementación en tu código: ya tienes “Depósito bancario” como opción en checkout; solo falta definir el estado de la orden (ej. `pending_bank_transfer`) y la pantalla/email con instrucciones e datos bancarios (por tenant o global).

---

## 4. Recomendación: mejor estrategia por fases

### Fase 1 (rápida y segura)

1. **Tarjeta (CardNet o Azul)**  
   - Integrar **solo flujo por página de pago hospedada**:  
     - CardNet: flujo POST/3DS (redirección a CardNet, retorno a `/[slug]/orden-completada` o similar).  
     - O Azul: “Payment Page” cuando tengas credenciales y documentación del contrato.  
   - En checkout, si el usuario elige “Tarjeta”, se crea la orden en estado “pendiente de pago” y se redirige a la URL de pago del proveedor con monto, referencia (order id), moneda (DOP).  
   - En la URL de retorno/callback confirmas el pago y actualizas la orden a “pagada” o “confirmada”.

2. **Depósito bancario**  
   - Mantener como opción en checkout.  
   - Orden en estado “pendiente transferencia”; pantalla/email con datos bancarios y número de orden.  
   - El restaurante marca la orden como pagada manualmente en el admin.

3. **Pago contra entrega**  
   - Sin cambios: orden creada y confirmada; pago al recibir.

### Fase 2 (opcional, más adelante)

- **Una sola pasarela primero:** elegir CardNet **o** Azul según:  
  - Contrato y comisiones que te ofrezcan.  
  - Calidad de documentación y soporte (CardNet tiene mejor doc pública).  
- Si más adelante quieres **experiencia in-site** con tarjeta:  
  - Evaluar tokenización / iframe de CardNet o Azul para no tocar PAN/CVV.  
  - O integrar su API “sin pantalla” usando solo tokens generados en su página o SDK.

---

## 5. Próximos pasos técnicos sugeridos

1. **Definir modelo de datos**  
   - Estados de orden: `pending`, `pending_payment` (esperando pago tarjeta o transferencia), `paid`, `preparing`, `ready`, `delivered`, `cancelled`.  
   - Campos en `orders`: `payment_method` (cod | bank_deposit | cardnet | azul), `payment_reference` (referencia del gateway o comprobante), `paid_at`.

2. **CardNet – flujo hospedado**  
   - Solicitar a CardNet: datos de afiliado (merchant-id, terminal-id) y documentación exacta del flujo “con pantalla” (POST/3DS): parámetros del formulario, URL de envío, parámetros de retorno/callback.  
   - Implementar en backend:  
     - Endpoint o server action que genere la URL o el formulario de pago con monto, `order_id`, moneda.  
     - Página o ruta de “retorno” donde CardNet redirige al usuario; ahí validar y actualizar la orden.

3. **Azul – flujo hospedado**  
   - Contactar a Azul (vozdelcliente@azul.com.do, 809-544-AZUL) y solicitar:  
     - Acceso a “Payment Page” o equivalente para e-commerce.  
     - Parámetros de entrada (monto, referencia, moneda) y URL de retorno.  
   - Implementar el mismo patrón: generar enlace/formulario → usuario paga en Azul → retorno a tu sitio y actualizar orden.

4. **Depósito bancario**  
   - Añadir en tenant o en configuración global: datos bancarios (nombre del banco, número de cuenta, tipo, nombre del titular, referencia opcional).  
   - En `/[slug]/orden-completada` (o en email): si `payment_method === 'bank_deposit'`, mostrar instrucciones y datos bancarios + número de orden.

5. **Pantalla de confirmación**  
   - Reutilizar o ampliar la pantalla tipo “Confirmación N°…” (como en la referencia Shopify/graniao):  
   - Mostrar método de pago (Pago contra entrega, Depósito bancario, Tarjeta CardNet/Azul), monto, dirección si aplica, y resumen de ítems.  
   - Enlace “Seguir comprando” a `/[slug]`.

---

## 6. Referencias

- CardNet Desarrolladores: https://developers.cardnet.com.do/  
- CardNet Botón de pago: https://cardnet.com.do/soluciones/online/boton-de-pago  
- CardNet REST (Ztrans): integración sin pantalla (API).  
- Azul E-commerce: https://www.azul.com.do/pages/en/e-commerce-azul.aspx  
- Azul contacto: vozdelcliente@azul.com.do, 809-544-AZUL (2985).  
- Ejemplos de código Azul (PHP/JSON): Gist (bran921007, luismts), pyazul (Python).

Si indicas con cuál pasarela quieres empezar (CardNet vs Azul) y si prefieres solo “página hospedada” o también API directa más adelante, se puede bajar esto a tareas concretas en el código (rutas, acciones de servidor y estados de orden).
