# ADR-003 - Identificación pública de organizaciones mediante subdominios

## Estado

Aceptada

---

## Contexto

La plataforma permitirá que múltiples organizaciones utilicen el mismo sistema (arquitectura multi-tenant).

En el MVP, los usuarios accederán a la plataforma mediante una única URL:

```text
https://turnosyagendas.com
```

Una vez autenticados, podrán seleccionar la organización con la que desean trabajar o buscar una organización para solicitar turnos o contratar suscripciones.

A futuro, se busca ofrecer una experiencia más personalizada para cada organización, permitiendo que los clientes accedan directamente a ella mediante una URL propia.

---

## Decisión

Desde el inicio, toda organización tendrá un **slug** único, generado o definido durante su creación.

Ejemplos:

| Organización         | Slug                |
| -------------------- | ------------------- |
| Gimnasio Tito        | gimnasio-tito       |
| Consultorio Dr. José | consultorio-dr-jose |

Durante el MVP, el slug será únicamente un identificador interno y no formará parte de la URL pública.

En una versión posterior, la plataforma utilizará ese mismo slug para generar un subdominio por organización.

Ejemplos:

```text
https://gimnasiotito.turnosyagendas.com
https://consultoriodrjose.turnosyagendas.com
```

El cambio no requerirá modificar el modelo de datos, ya que el slug existirá desde la primera versión.

---

## Consecuencias

### Ventajas

* El modelo de datos queda preparado para soportar subdominios.
* No será necesaria una migración de datos cuando se incorporen los subdominios.
* Cada organización podrá disponer de una URL propia para compartir con sus clientes.
* Facilita el uso de códigos QR y material publicitario con acceso directo a la organización.
* Abre la posibilidad de personalizar la experiencia de cada organización (logo, colores, información pública, etc.).

### Desventajas

* El campo **slug** deberá ser único dentro de toda la plataforma.
* Será necesario validar la disponibilidad del slug al crear o modificar una organización.

---

## Trabajo futuro

En una versión posterior al MVP se implementará:

* resolución automática de organizaciones mediante subdominios;
* configuración de DNS y certificados SSL para subdominios;
* personalización visual por organización (branding);
* páginas públicas específicas para cada organización utilizando su subdominio.

---

## Motivo de la decisión

Se decidió postergar la implementación de subdominios para mantener el alcance del MVP reducido, pero preparar desde el inicio el modelo de datos para incorporarlos posteriormente sin cambios estructurales.
