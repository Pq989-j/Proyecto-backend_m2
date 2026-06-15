# 🎬 Movie API REST

API REST para la gestión de películas, usuarios y sistema de favoritos.  
Construida con **Node.js, Express y MongoDB**, siguiendo arquitectura **MVC** y autenticación con **JWT**.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- dotenv
- nodemon
- MVC Architecture

---

# 📁 Project Structure (MVC)

Todo el código fuente está dentro de `src/`, mientras que el entry point está en la raíz.
├── index.js
├── .env
├── package.json
│
└── src/
├── controllers/
│ ├── auth_controller.js
│ ├── movie_controller.js
│
├── models/
│ ├── user_model.js
│ ├── movie_model.js
│
├── routes/
│ ├── auth_routes.js
│ ├── movie_routes.js
│ ├── favorites_routes.js
│
├── middlewares/
│ ├── verifyToken.js
│ ├── validate.js
│
├── validators/
│ ├── auth_validator.js
│ ├── movies_validator.js
│
├── config/
│ ├── db.js
│
└── app.js

---

# ⚙️ Environment Variables

``env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key

# Server Entry Point 🚀
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = 3000;

async function initServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

initServer();

---

# Server Flow
index.js
   ↓
load env variables
   ↓
connectDB()
   ↓
Express app.listen()
   ↓
API ready 🚀
---

# 🔗 Base URL
http://localhost:3000/api
---

# 🔐 Authentication System

Sistema basado en JWT (stateless authentication).

Register → Login → JWT → verifyToken → Protected Routes
---
# 🟢 Register
POST /api/auth/register
{
  "email": "user@email.com",
  "password": "123456"
}
---

# 🟢 Login
POST /api/auth/login
{
  "mensaje": "Login correcto",
  "token": "jwt_token"
}
---

# 🔵 Profile
GET /api/auth/profile

🔐 Requires JWT

Usuario desde req.usuario.id
Password excluido
favMovies con populate
---

# 🎬 Movies Module (CRUD)

Base URL:

/api/movies
## 🔵 Get all movies
GET /api/movies

## 🔵 Get movie by ID
GET /api/movies/:id

## 🟢 Create movie
POST /api/movies

🔐 Requires JWT

{
  "title": "Interstellar",
  "director": "Nolan",
  "release": 2014
}
## 🟠 Update movie
PUT /api/movies/:id

🔐 Requires JWT

## 🔴 Delete movie
DELETE /api/movies/:id

🔐 Requires JWT
---

# 🧠 Controllers Overview
## 🔐 Auth Controller
register → crea usuario
login → valida credenciales + JWT
getProfile → usuario con populate
addFavoriteMovie → añade favoritos

## 🎬 Movie Controller
getMovies → lista películas
getMovie → busca por ID
createMovie → crea película
updateMovie → actualiza película
deleteMovie → elimina película
---
# 🧩 Middlewares
## Middleware	- Función
verifyToken	valida JWT
validate	express-validator handler
---
# 🔐 Security
Passwords hashed (bcrypt)
JWT authentication
Protected routes
Input validation
No duplicate favorites
Sensitive data hidden
---
# 🧠 Database Models
## User
{
  email: String,
  password: String,
  favMovies: [ObjectId(Movie)]
}

## Movie
{
  title: String,
  director: String,
  release: Number
}
---

# 🔁 System Flow
User → Register → Login → JWT
     → Movies CRUD
     → Favorites
     → Profile (populate favorites)
---

# 🚀 Features Summary
Full REST API
JWT Authentication
MVC Architecture
Movies CRUD
Favorites system
MongoDB relationships
Input validation
Secure password handling
Clean structure