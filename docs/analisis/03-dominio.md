# Dominio

## Documentos relacionados

* [Producto](./00-producto.md)
* [Usuarios](./01-usuarios.md)
* [Roles](./02-roles.md)
* [Flujos](./04-flujos.md)

El dominio define los conceptos principales del negocio, el significado de cada uno y las relaciones que existen entre ellos. No describe aspectos técnicos de implementación, sino cómo funciona el negocio desde el punto de vista de la plataforma.

## Entidades del dominio

* Organización
* Usuario
* Rol
* Servicio
* Plan de suscripción
* Suscripción
* Turno recurrente
* Turno
* Comprobante de pago

---

## Definición de conceptos

### Organización

Representa a una empresa, consultorio, gimnasio, peluquería o cualquier otro prestador de servicios que utilice la plataforma para gestionar su actividad.

### Usuario

Es toda persona que posee una cuenta en la plataforma. Un mismo usuario puede participar en varias organizaciones y desempeñar distintos roles en cada una de ellas. Además, puede actuar como cliente de una o varias organizaciones utilizando la misma cuenta.

### Rol

Conjunto de permisos y responsabilidades que un usuario posee dentro de una organización.

Los roles definidos inicialmente son:

* Administrador
* Profesional
* Recepcionista

### Servicio

Es una prestación ofrecida por una organización a sus clientes.

Un servicio puede ser realizado por uno o varios profesionales de la organización. Si un profesional deja de pertenecer a la organización, el servicio continúa existiendo, aunque deje de estar disponible hasta que otro profesional sea asignado para realizarlo.

### Plan de suscripción

Define las condiciones comerciales bajo las cuales una organización ofrece un servicio mediante suscripción.

Un plan de suscripción establece, entre otros aspectos:

* el servicio al que corresponde;
* el precio;
* la cantidad máxima de clases permitidas por semana;
* la duración de la suscripción.

> **Decisión para el MVP:** un plan de suscripción estará asociado a un único servicio. En versiones futuras podrá incluir varios servicios.

### Suscripción

Es la contratación realizada por un cliente sobre un plan de suscripción.

La suscripción determina el período de vigencia durante el cual el cliente podrá reservar turnos recurrentes respetando las condiciones definidas por el plan contratado.

Toda suscripción está asociada a:

* un único cliente;
* un único plan de suscripción.

### Turno recurrente

Es la programación realizada por un cliente para reservar automáticamente un mismo servicio en días y horarios determinados durante la vigencia de una suscripción.

Un turno recurrente genera los turnos individuales correspondientes y debe respetar las limitaciones establecidas por el plan de suscripción contratado.

### Turno

Es la reserva realizada por un cliente para recibir un servicio en una fecha y hora determinada.

Todo turno está asociado a:

* un único servicio;
* un único profesional;
* un único cliente.

Un turno puede ser creado de forma individual o ser generado automáticamente a partir de un turno recurrente.

### Comprobante de pago

Es el comprobante cargado por un cliente para acreditar el pago de un turno o de una suscripción.

---

## Relaciones entre entidades

* Una organización posee uno o más usuarios.
* Todo usuario puede pertenecer a una o varias organizaciones.
* Dentro de cada organización, un usuario puede desempeñar uno o varios roles.
* Toda organización debe tener al menos un administrador.
* Los profesionales y recepcionistas pertenecen a una organización y son administrados por sus administradores.
* Una organización ofrece uno o varios servicios.
* Un servicio puede ser prestado por uno o varios profesionales.
* Un profesional puede prestar uno o varios servicios.
* Una organización puede ofrecer uno o varios planes de suscripción.
* Un plan de suscripción pertenece a un único servicio (en el MVP).
* Un cliente puede contratar uno o varios planes de suscripción.
* Una suscripción pertenece a un único cliente y a un único plan de suscripción.
* Una suscripción puede generar uno o varios turnos recurrentes.
* Un turno recurrente genera uno o varios turnos.
* Todo turno corresponde a un único servicio, un único profesional y un único cliente.
* Un comprobante de pago pertenece a un cliente y está asociado a una organización.

---

## Reglas de negocio

* Un usuario puede pertenecer a varias organizaciones.
* Un usuario puede desempeñar distintos roles en distintas organizaciones.
* Un usuario puede desempeñar más de un rol dentro de una misma organización.
* Toda organización debe contar con al menos un administrador.
* Todo turno corresponde a un único profesional.
* Todo turno corresponde a un único servicio.
* Un cliente utiliza la misma cuenta para interactuar con todas las organizaciones a las que pertenece.
* Un cliente solo podrá crear turnos recurrentes si posee una suscripción activa.
* La cantidad de turnos recurrentes que un cliente podrá crear estará limitada por el plan de suscripción contratado.

---

## Vocabulario oficial

* **Usuario:** toda persona que posee una cuenta en la plataforma.
* **Usuario de la organización:** usuario que forma parte de una organización desempeñando uno o más roles.
* **Cliente:** usuario que recibe los servicios ofrecidos por una organización.
* **Servicio:** prestación ofrecida por una organización a sus clientes.
* **Plan de suscripción:** conjunto de condiciones comerciales que determinan cómo se ofrece un servicio mediante suscripción.
* **Suscripción:** contratación realizada por un cliente sobre un plan de suscripción.
* **Turno recurrente:** programación automática de reservas periódicas realizada por un cliente durante la vigencia de una suscripción.
* **Turno:** reserva realizada por un cliente para recibir un servicio en una fecha y hora determinada.
* **Organización:** entidad que ofrece servicios a través de la plataforma.
* **Rol:** conjunto de permisos y responsabilidades asignados a un usuario dentro de una organización.
