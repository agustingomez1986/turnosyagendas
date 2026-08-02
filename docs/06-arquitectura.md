# Arquitectura

Este documento describe la arquitectura general de la plataforma y las principales decisiones técnicas adoptadas para el desarrollo del MVP.

No pretende definir la implementación detallada del sistema, sino establecer una base sólida que permita desarrollar el producto de forma ordenada, escalable y mantenible.

---

# Arquitectura general

La plataforma estará compuesta por una aplicación web que consumirá los servicios proporcionados por Supabase.

```text
                Usuario
                   │
                   ▼
        Aplicación Web (React)
                   │
                   ▼
              Supabase
        ├── Authentication
        ├── PostgreSQL
        ├── Storage
        └── Edge Functions (si fueran necesarias)
                   │
                   ▼
            Base de datos
```

La aplicación será desplegada en Netlify y consumirá directamente los servicios de Supabase.

---

# Tecnologías

## Frontend

* React
* Vite
* React Router

## Backend

* Supabase

## Base de datos

* PostgreSQL (Supabase)

## Autenticación

* Supabase Auth

## Almacenamiento de archivos

* Supabase Storage

Se utilizará para almacenar archivos enviados por los usuarios, como los comprobantes de pago.

## Hosting

* Netlify

## Control de versiones

* Git
* GitHub

---

# Principios de arquitectura

La plataforma se desarrollará siguiendo los siguientes principios:

* Arquitectura web.
* Arquitectura multi-organización (multi-tenant).
* Una única cuenta de usuario para toda la plataforma.
* Un usuario podrá pertenecer a múltiples organizaciones.
* Cada organización únicamente podrá acceder a su propia información.
* Las reglas de acceso estarán definidas mediante Row Level Security (RLS) de Supabase.
* El frontend únicamente accederá a información mediante usuarios autenticados.

---

# Organización general del sistema

La arquitectura lógica del sistema será la siguiente:

```text
React
   │
   ▼
Supabase Auth
   │
   ▼
Supabase Database
   │
   ▼
Supabase Storage
```

El frontend será responsable de la interfaz de usuario y de la interacción con Supabase.

Supabase será responsable de:

* autenticación;
* persistencia de datos;
* almacenamiento de archivos;
* aplicación de las reglas de seguridad.

---

# Seguridad

La plataforma deberá cumplir las siguientes reglas:

* Todos los usuarios deberán autenticarse.
* Ningún usuario podrá acceder a información de organizaciones a las que no pertenezca.
* Los permisos estarán determinados por los roles asignados dentro de cada organización.
* Los comprobantes de pago solo podrán ser consultados y validados por usuarios autorizados.
* Toda comunicación entre la aplicación y Supabase utilizará HTTPS.

---

# Escalabilidad

La arquitectura deberá permitir:

* incorporar nuevas organizaciones sin modificar el sistema;
* incorporar nuevos servicios;
* incorporar nuevos módulos;
* soportar múltiples profesionales por organización;
* permitir que un usuario pertenezca a múltiples organizaciones;
* evolucionar el modelo de suscripciones sin afectar la arquitectura general.

---

# Restricciones técnicas

Para el desarrollo del MVP se adoptan las siguientes restricciones:

* No se desarrollará un backend propio.
* Toda la lógica posible se implementará utilizando los servicios de Supabase.
* La aplicación será responsive y podrá utilizarse desde computadoras, tablets y teléfonos móviles.
* El acceso a la plataforma se realizará mediante un navegador web.
* El despliegue se realizará automáticamente desde GitHub hacia Netlify.

---

# Decisiones arquitectónicas

Durante el Sprint 0 se adoptaron las siguientes decisiones:

* La plataforma será una aplicación web.
* Se utilizará React para el frontend.
* Se utilizará Supabase como backend y base de datos.
* Se utilizará PostgreSQL como motor de base de datos.
* Se utilizará Supabase Auth para la autenticación.
* Se utilizará Supabase Storage para almacenar comprobantes de pago.
* Se utilizará Netlify para el despliegue del frontend.
* La plataforma soportará múltiples organizaciones.
* Un usuario podrá pertenecer a varias organizaciones utilizando una única cuenta.
* Los permisos estarán determinados por los roles asignados dentro de cada organización.
* El sistema permitirá gestionar turnos individuales, turnos recurrentes, planes de suscripción y suscripciones.
* El MVP permitirá un único servicio por plan de suscripción. La posibilidad de asociar múltiples servicios a un mismo plan se evaluará en versiones futuras.

---

# Evolución futura

La arquitectura deberá facilitar la incorporación de nuevas funcionalidades sin requerir cambios significativos en la estructura general del sistema.

Entre las funcionalidades previstas para futuras versiones se encuentran:

* integración con medios de pago;
* integración con calendarios externos;
* planes de suscripción con múltiples servicios;
* reportes y estadísticas;
* notificaciones automáticas;
* aplicación móvil nativa.
