const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hola mi respuesta para que tengas")
})
app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const array = [
        { id: 1, nombre: "Lord of the Rings: The Return of the king" },
        { id: 2, nombre: "Oppenheimer" },
        { id: 3, nombre: "Schiendler's list" },
        { id: 4, nombre: "Taxi Driver" },
        { id: 5, nombre: "2001: A space Odyssey"}
    ];

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

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]${req.method}${req.url}`);
    next();
});

app.get("/api/saludo/:nombre", (req, res) => {
  const nombre = req.params.nombre;

  if (nombre.length < 2) {
    return res.status(400).json({ error: "El nombre es muy corto" });
  }

  return res.status(200).json({ mensaje: `Hola, ${nombre}` });
});

app.post("/api/peliculas", (req,res)=> {
    console.log(req.body)
    const{nombre}=req.body

    if(!nombre) {
        return res.status(400).json({error: "Faltan titulo o contenido"})
    }

    const nuevapeli = {
        id: array.length + 1,
        nombre
    };

    array.push(nuevapeli);
    return res.status(201).json(nuevapeli);
});




