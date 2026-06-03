const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const fs = require("node:fs").promises;
const path = require("path");

const RUTA_DATOS = path.join(__dirname, "peliculas.json");

async function cargarPeliculas() {
  const contenido = await fs.readFile(RUTA_DATOS, "utf-8");
  return JSON.parse(contenido);
}

async function guardarpeliculas(array) {
  await fs.writeFile(RUTA_DATOS, JSON.stringify(array, null, 2), "utf-8");
}

app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]${req.method}${req.url}`);
    next();
});

const array = [
    { id: 1, nombre: "The Lord of the Rings: The Return of the king", director: "Peter Jackson", estreno: "Dec 2003"},
    { id: 2, nombre: "Oppenheimer", director: "Christopher Nolan", estreno: "June 2023"},
    { id: 3, nombre: "Schiendler's list", director: "Steven Spielberg", estreno: "Dec 1993" },
    { id: 4, nombre: "Taxi Driver", director: "Martin Scorsese", estreno: "Feb 1976"},
    { id: 5, nombre: "2001: A space Odyssey", director: "Stanley Kubrick", estreno: "Oct 1968"}
];
app.get("/", (req, res) => {
    res.send("Hola mi respuesta para que tengas")
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/peliculas", (req, res) => {
    return res.status(200).json(array);
});


app.get("/api/peliculas/:id", (req, res) => {
    const id = Number(req.params.id);
  const peli = array.find((p) => p.id === id);
    if (!peli) {
        return res.status(404).json({ error: "Pelicula no encontrada" });
    }

  return res.json(peli);
});


app.post("/api/peliculas", (req,res)=> {
    console.log(req.body)
    const{nombre, director, estreno}=req.body

    if(!nombre || !director || !estreno) {
        return res.status(400).json({error: "Faltan propiedades"})
    }

    const nuevapeli = {
        id: array.length + 1,
        nombre,
        director,
        estreno
    };

    array.push(nuevapeli);
    return res.status(201).json(nuevapeli);
});

app.put("/api/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = array.findIndex((n) => n.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Nota no encontrada" });
  }

    const { nombre, director, estreno } = req.body;
    if (!nombre || !director || !estreno) {
        return res.status(400).json({ error: "Faltan propiedades" });
    }
    const peliculaActualizada = { id, nombre, director, estreno };
    array[indice] = peliculaActualizada;

    res.json(peliculaActualizada);
});

app.delete("/api/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = array.findIndex((n) => n.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "Pelicula no encontrada" });
    }

    const [PeliBorrada] = array.splice(indice, 1)

    array.forEach((peli, index) => {
        peli.id = index + 1;
    });
    res.json({ mensaje: "Pelicula borrada", peli: PeliBorrada });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`);
});




