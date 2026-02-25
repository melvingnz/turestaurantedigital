# Integración Resend + Supabase — Tu Restaurante Digital

Esta guía explica cómo hacer que **Supabase Auth** envíe los correos de confirmación (y otros) a través de **Resend**, y cómo dejar el dominio **turestaurantedigital.com** verificado para que no falle el envío.

---

## Resumen

1. **Resend:** Verificar el dominio añadiendo los registros DNS (DKIM y SPF) en tu proveedor de dominio.
2. **Supabase:** Configurar SMTP personalizado usando las credenciales de Resend.

Sin el paso 1, Resend marcará el dominio como **Failed** y los envíos pueden fallar. Sin el paso 2, Supabase usará su propio envío (límites y a veces "Error sending confirmation email").

---

## Si usas Google Workspace (mismo dominio)

Si **turestaurantedigital.com** usa **Google Workspace** para el correo (Gmail con tu dominio), el DNS ya tiene registros de Google. Puedes usar Resend en el mismo dominio sin quitar el correo de Google; solo hay que **sumar** registros y **editar** el SPF en lugar de crear uno nuevo.

| Qué | Cómo convive con Google |
|-----|--------------------------|
| **DKIM** | Sin conflicto. Google usa su propio selector (ej. `google._domainkey`); Resend usa `resend._domainkey`. Añade el TXT de Resend como en 1.2. |
| **SPF** | **Solo puede existir un registro SPF** por dominio. Google ya tiene uno tipo `v=spf1 include:_spf.google.com ~all`. **No crees otro.** Edita ese mismo registro y añade Resend/SES: `v=spf1 include:_spf.google.com include:amazonses.com ~all` (ver 1.3 más abajo). |
| **MX** del subdominio `send` | El MX que pide Resend es para el subdominio **send** (bounces de SES). No toca los MX del dominio raíz (esos siguen siendo los de Google). Añade el MX de Resend para `send` como en 1.3. |

**Dónde editar DNS:** Si el dominio está en Google (Google Domains / Squarespace después de la migración), entra ahí. Si el dominio está en otro proveedor (Cloudflare, GoDaddy, etc.) pero el correo lo gestiona Google Workspace, los MX del raíz apuntan a Google; edita el DNS en ese proveedor y aplica los cambios de la tabla de arriba.

---

## GoDaddy + Google Workspace (paso a paso seguro)

Dominio en **GoDaddy**, correo recibido en **Google Workspace**, envío con **Resend** desde tu dominio. Objetivo: no tocar nada de la recepción en Gmail; solo añadir lo que pide Resend.

**Regla de oro:** No borres ni cambies los **MX del dominio raíz** (los que apuntan a `aspmx.l.google.com`, etc.). Esos son los que hacen que el correo llegue a Google Workspace. Solo vas a **añadir** registros nuevos y **editar** un TXT (el SPF).

### En GoDaddy

1. Entra a [godaddy.com](https://www.godaddy.com) → **Mis Productos** → tu dominio **turestaurantedigital.com** → **DNS** (o **Administrar DNS**).
2. Deja abierta en otra pestaña la página de Resend → **Domains** → **turestaurantedigital.com** → **Records**, para copiar Name y Value.

### Paso A — DKIM de Resend (solo añadir)

- **Tipo:** TXT  
- **Nombre / Host:** `resend._domainkey` (en GoDaddy a veces el panel añade solo el prefijo; si pide “nombre”, usa `resend._domainkey`).  
- **Valor:** el que te da Resend (empieza por `p=MIGfMA0G...`), completo.  
- **TTL:** 1 hora (3600) o el que venga por defecto.  
- Guarda. No afecta a Google; es un registro nuevo solo para Resend.

### Paso B — MX del subdominio `send` (solo añadir)

- **Tipo:** MX  
- **Nombre / Host:** `send` (solo el subdominio; el dominio raíz no se toca).  
- **Valor / Apunta a:** `feedback-smtp.amazonses.com`  
- **Prioridad:** 10  
- **TTL:** 1 hora (3600).  
- Guarda. Este MX es solo para `send.turestaurantedigital.com` (bounces de Resend). Los MX de `@` o del dominio raíz (Google) siguen igual y la recepción en Gmail no cambia.

### Paso C — SPF (editar el existente, no duplicar)

- Busca en la lista de registros un **TXT** cuyo **valor** empiece por `v=spf1`. Suele estar en el host **@** (o el nombre del dominio raíz).  
- **No crees un segundo TXT SPF.**  
- **Edita** ese TXT y deja el valor en una sola línea así (Google + Resend/SES):

  ```text
  v=spf1 include:_spf.google.com include:amazonses.com ~all
  ```

- Si hoy tienes solo Google, será algo como `v=spf1 include:_spf.google.com ~all`; solo añade `include:amazonses.com` antes de `~all`.  
- Guarda.

### Resumen seguro

| Acción | Registro | ¿Afecta recepción en Google? |
|--------|----------|------------------------------|
| **Añadir** | TXT `resend._domainkey` = (valor de Resend) | No |
| **Añadir** | MX `send` → `feedback-smtp.amazonses.com` prioridad 10 | No (es subdominio) |
| **Editar** | TXT @ con `v=spf1 include:_spf.google.com include:amazonses.com ~all` | No (sigue autorizando a Google y añade Resend) |
| **No tocar** | MX de @ (aspmx.l.google.com, etc.) | — Son los que reciben el correo en Gmail |

Tras guardar, espera unos minutos (o hasta 48 h en raros casos). En Resend, el dominio debería pasar a **Verified**. La recepción en Google Workspace se mantiene; el envío desde tu dominio (Supabase, formularios, etc.) saldrá por Resend.

---

## Parte 1: Verificar el dominio en Resend (DKIM y SPF)

El estado **Failed** en Resend significa que faltan registros DNS en el proveedor donde está registrado **turestaurantedigital.com** (Google Domains, Cloudflare, GoDaddy, etc.).

### 1.1 Entrar a Resend

1. [resend.com](https://resend.com) → **Domains** → dominio **turestaurantedigital.com**.
2. Pestaña **Records** (o **DNS Records**).

### 1.2 DKIM (verificación del dominio)

Resend muestra algo como:

| Type | Name              | Value        | Status  |
|------|-------------------|--------------|---------|
| TXT  | `resend._domainkey` | `p=MIGfMA0G...` | Failed |

**Qué hacer:**

1. Copia **Name** y **Value** exactamente como aparecen en Resend.
2. En tu **proveedor de dominio** (donde gestionas DNS de turestaurantedigital.com):
   - Añade un registro **TXT**.
   - **Nombre / Host:** `resend._domainkey` (algunos proveedores piden solo `resend._domainkey` y otros `resend._domainkey.turestaurantedigital.com`; si tu dominio ya se asume, usa lo que pida el panel).
   - **Valor / Content:** el valor completo que te da Resend (empieza por `p=MIGfMA0G...`).
   - **TTL:** 3600 o Auto.
3. Guarda. La propagación DNS puede tardar unos minutos o hasta 24–48 h.

### 1.3 SPF (habilitar envío)

Resend puede mostrar un **MX** para el subdominio `send` y/o un **TXT** SPF.

**A) Registro MX para el subdominio `send`** (bounces de Resend/SES)

En tu **proveedor de dominio**, añade un registro **MX**:
- **Nombre / Host:** `send` (o `send.turestaurantedigital.com` si el proveedor lo pide así).
- **Valor / Apunta a:** `feedback-smtp.amazonses.com`.
- **Prioridad:** `10`.
- **TTL:** 3600 o Auto.

Este MX es solo para el subdominio `send`; no afecta los MX de Google Workspace del dominio raíz.

**B) Registro TXT SPF**

- **Si NO usas Google Workspace (ni otro correo en este dominio):**  
  Añade el registro TXT que indique Resend para SPF (ej. `v=spf1 include:amazonses.com ~all`) en el host que indique Resend (a menudo `@` o el dominio raíz).

- **Si SÍ usas Google Workspace:**  
  Solo puede haber **un** registro SPF en el dominio. Localiza el TXT existente que empieza por `v=spf1` (suele ser algo como `v=spf1 include:_spf.google.com ~all`). **Edita ese mismo registro** y añade `include:amazonses.com` antes de `~all`:

  ```text
  v=spf1 include:_spf.google.com include:amazonses.com ~all
  ```

  No crees un segundo registro SPF; si hay dos, el correo puede fallar.

### 1.4 Comprobar en Resend

- Espera unos minutos (o más si el DNS tarda).
- En Resend → **Domains** → **turestaurantedigital.com** recarga o vuelve a la pestaña **Records**.
- Cuando los registros se resuelvan bien, el **Status** pasará a **Verified** (o similar) y el estado del dominio dejará de ser **Failed**.

Mientras el dominio esté en Failed, los envíos pueden fallar; por eso Supabase devuelve "Error sending confirmation email".

---

## Parte 2: Configurar Supabase para usar Resend (SMTP)

Cuando el dominio en Resend esté verificado, configura Supabase para que envíe el correo por Resend.

### 2.1 Datos de Resend SMTP

- **Host:** `smtp.resend.com`
- **Port:** `465` (SSL) o `587` (TLS)
- **User:** `resend`
- **Password:** tu **Resend API Key** (la misma que usas en la app: en `.env.local` es `RESEND_API_KEY`).
  - Obtener/copiar: Resend → **API Keys** → crear o copiar una key.

El **remitente** que uses en Supabase debe ser un correo de tu dominio verificado, por ejemplo:

- `noreply@turestaurantedigital.com`
- o `contacto@turestaurantedigital.com` (si ese dominio/alias está verificado)

### 2.2 Configuración en Supabase

1. **Supabase Dashboard** → tu proyecto → **Project Settings** (engranaje) → **Auth**.
2. Busca la sección **SMTP Settings** (o **Email** / **Custom SMTP**).
3. Activa **Enable Custom SMTP** (o equivalente).
4. Rellena:

   | Campo           | Valor                    |
   |-----------------|---------------------------|
   | Sender email    | `noreply@turestaurantedigital.com` (o el que uses) |
   | Sender name     | `Tu Restaurante Digital`  |
   | Host            | `smtp.resend.com`         |
   | Port            | `465` (o `587`)           |
   | Username        | `resend`                  |
   | Password        | Tu Resend API Key         |

5. Guarda.

### 2.3 Probar

1. En tu app (localhost o producción), intenta **Registrarse** con un email que revises.
2. Revisa la bandeja de entrada (y spam); deberías recibir el correo con el código de 6 dígitos.
3. Si sigue fallando, revisa **Supabase** → **Authentication** → **Logs** para el error concreto.

---

## Resumen rápido

| Dónde              | Qué hacer |
|--------------------|-----------|
| **DNS del dominio**| Añadir TXT `resend._domainkey` (DKIM). Añadir MX `send` → `feedback-smtp.amazonses.com`. SPF: si usas **Google Workspace**, editar el TXT SPF existente y añadir `include:amazonses.com`; si no, añadir el TXT SPF que indique Resend. |
| **Resend**         | Comprobar que el dominio pase a **Verified** (ya no Failed). |
| **Supabase**       | Auth → SMTP: Host `smtp.resend.com`, User `resend`, Password = Resend API Key, Sender = email @turestaurantedigital.com. |

Con esto, la integración Resend + Supabase queda lista y el "Error sending confirmation email" debería desaparecer. Con Google Workspace, el correo de Gmail sigue igual; solo se añaden Resend (DKIM + MX send) y se actualiza el SPF para incluir ambos.
