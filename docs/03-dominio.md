# Dominio

El dominio define los conceptos principales del negocio, el significado de cada uno y las relaciones que existen entre ellos. No describe aspectos técnicos de implementación, sino cómo funciona el negocio desde el punto de vista de la plataforma.

## Entidades del dominio

* Organización
* Usuario
* Rol
* Servicio
* Turno
* Comprobante de pago

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

### Turno

Es la reserva realizada por un cliente para recibir un servicio en una fecha y hora determinada.

Todo turno está asociado a:

* un único servicio;
* un único profesional;
* un único cliente.

### Comprobante de pago

Es el comprobante cargado por un cliente para acreditar el pago de un servicio o una suscripción cuando corresponda.

## Relaciones entre entidades

* Una organización posee uno o más usuarios.
* Todo usuario puede pertenecer a una o varias organizaciones.
* Dentro de cada organización, un usuario puede desempeñar uno o varios roles.
* Toda organización debe tener al menos un administrador.
* Los profesionales y recepcionistas pertenecen a una organización y son administrados por sus administradores.
* Una organización ofrece uno o varios servicios.
* Un servicio puede ser prestado por uno o varios profesionales.
* Un profesional puede prestar uno o varios servicios.
* Un cliente puede reservar turnos en cualquier organización de la que sea cliente.
* Todo turno corresponde a un único servicio, un único profesional y un único cliente.
* Un comprobante de pago pertenece a un cliente y está asociado a una organización.

## Reglas de negocio

* Un usuario puede pertenecer a varias organizaciones.
* Un usuario puede desempeñar distintos roles en distintas organizaciones.
* Un usuario puede desempeñar más de un rol dentro de una misma organización.
* Toda organización debe contar con al menos un administrador.
* Todo turno corresponde a un único profesional.
* Todo turno corresponde a un único servicio.
* Un cliente utiliza la misma cuenta para interactuar con todas las organizaciones a las que pertenece.

## Vocabulario oficial

* **Usuario:** toda persona que posee una cuenta en la plataforma.
* **Usuario de la organización:** usuario que forma parte de una organización desempeñando uno o más roles.
* **Cliente:** usuario que recibe los servicios ofrecidos por una organización.
* **Servicio:** prestación ofrecida por una organización a sus clientes.
* **Turno:** reserva realizada por un cliente para recibir un servicio en una fecha y hora determinada.
* **Organización:** entidad que ofrece servicios a través de la plataforma.
* **Rol:** conjunto de permisos y responsabilidades asignados a un usuario dentro de una organización.
