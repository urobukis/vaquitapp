# 💸 Vaquitapp

Vaquitapp es una aplicación fullstack diseñada para ayudarte a gestionar gastos compartidos dentro de grupos. Ideal para viajes, salidas con amigos o convivencias, donde es necesario llevar el control de quién pagó qué y cómo se reparte la deuda.

---

## 🌟 ¿Qué se puede hacer?

### 👥 Usuarios y autenticación

* Crear una cuenta con email y contraseña.
* Iniciar sesión de forma segura con JWT.
* Mantener la sesión activa con tokens refresh.

### 📦 Grupos

* Crear un grupo y ser su propietario.
* Ver todos los grupos de los que formás parte.
* Ver el detalle de un grupo específico.
* Agregar miembros a un grupo (usuarios existentes o anónimos).
* Buscar usuarios por nombre para agregarlos.

### 💰 Gastos

* Registrar un gasto indicando:

  * Quién lo pagó.
  * A qué miembros del grupo afecta.
  * El monto total.
* Ver balances automáticos entre todos los miembros del grupo:

  * Quién debe a quién y cuánto.

---

## 🌐 Frontend

El frontend está desarrollado en **React** con **Next.js** y **Tailwind CSS**. Se conecta con esta API para todas las funciones descritas.

### Características destacadas:

* Panel de grupos con acceso rápido a cada uno.
* Interfaz visual para añadir miembros y gastos.
* Balance dinámico por grupo.
* Búsqueda inteligente de usuarios.
* Soporte para agregar miembros anónimos.

---

## 🔐 Seguridad

* Todos los endpoints (excepto login, registro y refresh) requieren autenticación con JWT.
* El token se debe enviar en la cabecera de cada petición:

```http
Authorization: Bearer <token>
```

---

## 💠 Tecnologías utilizadas

### Backend

* Java 17
* Spring Boot
* Spring Security + JWT
* JPA (Hibernate)
* MySQL
* Maven

### Frontend

* React
* Next.js
* Tailwind CSS
* Zustand (manejo de estado)
* Axios
* React Hook Form
* React Select (Async)

---

## 📄 Swagger

Podés ver y probar los endpoints desde la documentación Swagger:

👉 [https://vaquitapp.onrender.com/swagger-ui/index.html](https://vaquitapp.onrender.com/swagger-ui/index.html)

---

## 🌍 Producción

* API: [https://vaquitapp.onrender.com](https://vaquitapp.onrender.com)
* Frontend: actualmente en desarrollo local (próximamente desplegado)

