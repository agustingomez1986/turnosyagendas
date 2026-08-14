# Turnos y Agendas — Codex Instructions

## Objetivo del proyecto

Turnos y Agendas es una aplicación web SaaS para gestionar organizaciones, servicios, profesionales, disponibilidad, reservas y turnos recurrentes.

El sistema debe soportar múltiples organizaciones y permitir que un mismo usuario pueda pertenecer a distintas organizaciones con roles diferentes.

## Fuente de verdad

Antes de escribir o modificar código:

1. Revisar primero el código existente.
2. Leer la documentación relevante dentro de `docs/`.
3. Leer los ADR relacionados dentro de `docs/adr/`.
4. Respetar las decisiones arquitectónicas ya documentadas.
5. No asumir que una implementación recordada o inferida sigue siendo válida si puede comprobarse en el repositorio.
6. Si la documentación y el código existente parecen contradecirse, no tomar una decisión arquitectónica silenciosamente: señalar la discrepancia.

El repositorio y su documentación son la fuente de verdad del proyecto.

## Stack

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL mediante Supabase
- django-environ
- Ruff

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- ESLint
- Prettier

### Infraestructura

- Docker
- Docker Compose
- GitHub Actions

## Forma de trabajar

Trabajar únicamente sobre el alcance solicitado.

No implementar funcionalidades adicionales por iniciativa propia.

No realizar refactors grandes que no sean necesarios para completar la tarea actual.

Antes de modificar una parte del sistema, inspeccionar los archivos relacionados y seguir los patrones existentes del proyecto.

Los cambios locales ajenos a la tarea deben preservarse: no restaurarlos, formatearlos ni incluirlos en commits sin autorización explícita.

Preferir soluciones simples, mantenibles y apropiadas para un proyecto profesional.

No duplicar lógica existente.

No introducir abstracciones prematuras.

Mantener los archivos de texto y código en UTF-8 y con finales de línea LF, respetando las configuraciones del repositorio.

## Dependencias

No agregar una dependencia nueva si la funcionalidad puede resolverse razonablemente con las dependencias existentes.

Si es necesario agregar una dependencia:

1. comprobar primero que realmente sea necesaria;
2. utilizar una dependencia mantenida y apropiada para el stack;
3. instalarla usando el gestor de paquetes correspondiente;
4. actualizar los archivos de dependencias;
5. informar brevemente para qué se agregó.

Nunca eliminar ni actualizar dependencias existentes de forma masiva salvo que la tarea lo requiera explícitamente.

## Backend

Al modificar el backend:

- respetar la estructura existente de aplicaciones Django;
- utilizar Django ORM salvo que exista una razón documentada para no hacerlo;
- mantener la lógica de negocio fuera de las vistas cuando corresponda;
- utilizar serializers y mecanismos de DRF de forma idiomática;
- respetar `backend/config/settings.py` y la configuración mediante variables de entorno;
- no crear configuraciones separadas de development y production sin una necesidad documentada;
- no incluir secretos ni credenciales en el código;
- mantener compatibilidad con PostgreSQL/Supabase.

Si se modifican modelos:

- crear las migraciones necesarias;
- revisar las migraciones antes de considerarlas terminadas;
- no editar migraciones históricas ya aplicadas salvo instrucción explícita.

## Frontend

Al modificar el frontend:

- utilizar TypeScript;
- respetar la estructura existente de componentes, páginas, hooks y servicios;
- evitar lógica de acceso a API duplicada;
- utilizar la configuración Axios existente cuando corresponda;
- no introducir estado global sin necesidad;
- mantener los componentes pequeños y con responsabilidades claras.

Si se modifican dependencias del frontend, mantener sincronizados `package.json` y `package-lock.json`.

## Tests y validación

Antes de considerar terminada una tarea, ejecutar los checks relevantes para los archivos modificados.

Backend, cuando corresponda, desde la raíz del repositorio:

```bash
ruff check backend
ruff format --check backend
python backend/manage.py check
python backend/manage.py test
```

Frontend, cuando corresponda, comenzando desde la raíz del repositorio:

```bash
cd frontend
npm run lint
npm run format:check
npm run build
```

Nunca ejecutar tests deliberadamente contra la base de datos de producción o desarrollo. Verificar que Django utilice una base de pruebas separada y tener especial cuidado con conexiones PostgreSQL/Supabase.

Si alguno falla debido a los cambios realizados:

1. identificar la causa;
2. corregirla;
3. volver a ejecutar el check.

No ocultar ni ignorar errores para conseguir que los checks pasen.

Si un error ya existía antes de la tarea y no está relacionado con los cambios, informarlo claramente.

## Git

Nunca trabajar directamente sobre `main` para implementar una funcionalidad.

Antes de comenzar cambios:

1. comprobar la rama actual;
2. comprobar que no existan cambios locales ajenos a la tarea;
3. utilizar una rama apropiada para la funcionalidad o corrección.

Convenciones orientativas:

- `feature/...`
- `fix/...`
- `chore/...`

Antes de hacer commit:

1. revisar `git status`;
2. revisar el diff;
3. ejecutar los tests y linters relevantes;
4. comprobar que no se incluyan `.env`, secretos, archivos temporales ni archivos generados innecesarios.

Crear commits pequeños y coherentes con mensajes descriptivos.

No hacer `push`, merge ni eliminar ramas salvo que la tarea lo solicite explícitamente.

## Seguridad

Nunca:

- agregar `.env` al repositorio;
- imprimir secretos o credenciales;
- hardcodear passwords, tokens o claves;
- desactivar controles de seguridad para solucionar un problema;
- modificar configuraciones de producción sin que la tarea lo requiera.

## Documentación

Si una implementación modifica una decisión funcional o arquitectónica ya documentada, actualizar la documentación correspondiente.

No modificar documentación sólo para hacerla coincidir con una implementación incorrecta.

Las decisiones arquitectónicas importantes deben documentarse mediante ADR cuando corresponda.

## Comportamiento esperado de Codex

Antes de una tarea no trivial:

1. inspeccionar el código y documentación relevante;
2. explicar brevemente qué archivos probablemente se modificarán;
3. implementar la solución;
4. ejecutar los checks relevantes;
5. revisar el diff resultante;
6. resumir qué cambió y qué validaciones se ejecutaron.

Cuando exista una decisión de producto, dominio o arquitectura que no esté definida en la documentación ni pueda inferirse claramente del código existente, no inventarla silenciosamente. Señalarla para que pueda decidirse antes de continuar.
