const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const fs = require("node:fs").promises;
const path = require("path");

const RUTA_DATOS = path.join(__dirname, "peliculas.json");

async function cargarPeliculas() {
  try {
    const contenido = await fs.readFile(RUTA_DATOS, "utf-8");
    return JSON.parse(contenido);
    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile(RUTA_DATOS, "[]", "utf-8");
            return [];
        }
        throw error;
    }
}

async function guardarpeliculas(peliculas) {
    peliculas.forEach((peli, index) => {
        peli.id = index + 1;
    });
  await fs.writeFile(RUTA_DATOS, JSON.stringify(peliculas, null, 2), "utf-8");
}

app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]${req.method}${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hola mi respuesta para que tengas")
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/peliculas", async (req, res) => {
    try {
        const peliculas = await cargarPeliculas();
        return res.status(200).json(peliculas);
    } catch (error) {
        console.error("Error al cargar las peliculas:", error);
        res.status(500).json({ error: "Error al cargar las peliculas" });
    }
});


app.get("/api/peliculas/:id", async (req, res) => {
    try {
        const peliculas = await cargarPeliculas();
        const id = Number(req.params.id);
        const peli = peliculas.find((p) => p.id === id);
        if (!peli) {
            return res.status(404).json({ error: "Pelicula no encontrada" });
        }
        return res.json(peli);
    } catch (error) {
        console.error("Error al cargar las peliculas:", error);
        res.status(500).json({ error: "Error al cargar las peliculas" });
    }
});


app.post("/api/peliculas", async (req,res)=> {

    const{nombre, director, estreno} = req.body

    if(!nombre || !director || !estreno) {
        return res.status(400).json({error: "Faltan propiedades"})
    }
    
    try {
        const peliculas = await cargarPeliculas();
        const nuevoId =
            peliculas.length > 0 ? Math.max(...peliculas.map((n) => n.id)) + 1 : 1;
        const nuevapeli = {
            id: nuevoId,
            nombre,
            director,
            estreno
        };
        peliculas.push(nuevapeli);
        await guardarpeliculas(peliculas);
        return res.status(201).json(nuevapeli);
    } catch (error) {
        console.error("Error al cargar las peliculas:", error);
        res.status(500).json({ error: "Error al cargar las peliculas" });
    }
});

app.put("/api/peliculas/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nombre, director, estreno } = req.body;

    if (!nombre || !director || !estreno) {
        return res.status(400).json({ error: "Faltan propiedades" });
    }
    
    try {
        const peliculas = await cargarPeliculas();
        const indice = peliculas.findIndex((n) => n.id === id);

        if (indice === -1) {
         return res.status(404).json({ error: "Pelicula no encontrada" });
        }

        const peliculaActualizada = { id, nombre, director, estreno };
        peliculas[indice] = peliculaActualizada;

        await guardarpeliculas(peliculas);
        res.json(peliculaActualizada);
    } catch (error) {
        console.error("Error al cargar las peliculas:", error);
        res.status(500).json({ error: "Error al cargar las peliculas" });
    }
});

app.delete("/api/peliculas/:id", async (req, res) => {
  const id = Number(req.params.id);
  
  try{
        const peliculas = await cargarPeliculas();
        const indice = peliculas.findIndex((n) => n.id === id);

        if (indice === -1) {
            return res.status(404).json({ error: "Pelicula no encontrada" });
        }

        const [PeliBorrada] = peliculas.splice(indice, 1)

        await guardarpeliculas(peliculas);
        res.json({ mensaje: "Pelicula borrada", peli: PeliBorrada });
    } catch (error) {
        console.error("Error al cargar las peliculas:", error);
        res.status(500).json({ error: "Error al cargar las peliculas" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`);
});




