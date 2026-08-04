# Roles

## Documentos relacionados

* [Producto](./00-producto.md)
* [Usuarios](./01-usuarios.md)
* [Dominio](./03-dominio.md)
* [Flujos](./04-flujos.md)

El objetivo de este documento es definir los distintos roles que pueden desempeñar los usuarios dentro de una organización y establecer sus responsabilidades, alcance y restricciones.

Un mismo usuario podrá desempeñar uno o más roles dentro de una misma organización, según las necesidades de esta.

---

## Administrador

### Propósito

Administrar la organización y su configuración general.

### Responsabilidades

* Administrar la información de la organización.
* Crear, modificar y eliminar servicios.
* Crear, modificar y eliminar planes de suscripción.
* Incorporar, modificar y administrar profesionales.
* Incorporar, modificar y administrar recepcionistas.
* Administrar las suscripciones de los clientes.
* Administrar los turnos y turnos recurrentes de los clientes.
* Aprobar o rechazar comprobantes de pago.
* Tendrá además todos los permisos correspondientes a los roles de Profesional y Recepcionista.

### Alcance

Puede administrar toda la información perteneciente a la organización.

### Restricciones

* No puede administrar organizaciones a las que no pertenece.

---

## Profesional

### Propósito

Gestionar la prestación de los servicios que tiene asignados y administrar la disponibilidad de su agenda.

### Responsabilidades

* Definir los días y horarios de disponibilidad.
* Definir la duración de los turnos.
* Gestionar los turnos correspondientes a los servicios que presta.
* Registrar la asistencia o inasistencia de los clientes a sus turnos.

### Alcance

Puede administrar únicamente la información relacionada con los servicios que presta y los turnos asociados a ellos.

### Restricciones

* No puede modificar la disponibilidad de otros profesionales.
* No puede administrar los turnos correspondientes a otros profesionales.
* No puede administrar la configuración de la organización.
* No puede aprobar comprobantes de pago.

---

## Recepcionista

### Propósito

Asistir en la gestión diaria de la agenda y la atención de los clientes.

### Responsabilidades

* Crear, modificar y cancelar turnos.
* Crear, modificar y cancelar turnos recurrentes.
* Administrar las suscripciones de los clientes.
* Registrar comprobantes de pago.
* Aprobar o rechazar comprobantes de pago.
* Registrar la asistencia o inasistencia de los clientes.

### Alcance

Puede administrar la agenda de la organización y las reservas de los clientes.

### Restricciones

* No puede modificar la disponibilidad definida por los profesionales.
* No puede administrar servicios.
* No puede administrar planes de suscripción.
* No puede administrar profesionales.
* No puede administrar la configuración de la organización.

---

## Permisos implícitos

* Una organización podrá tener uno o varios administradores.
* Un usuario podrá desempeñar uno o más roles dentro de una misma organización.
* Un usuario podrá tener roles diferentes en organizaciones distintas.
* Un administrador posee además todos los permisos de Profesional y Recepcionista.
* Los permisos efectivos de un usuario serán la unión de todos los roles que tenga asignados dentro de una organización.
