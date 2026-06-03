const fs = require("node:fs").promises;
const path = require("node:path");

const FILE_PATH = path.join(__dirname, "..", "..", "movies.json");

async function fileReader() {
  try {
    const content = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(content);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("Archivo no encontrado, creando uno nuevo...");
            await fs.writeFile(FILE_PATH, "[]", "utf-8");
            return [];
        }
        throw error;
    }
}

async function fileWriter(movies) {
    movies.forEach((movie, index) => {
        movie.id = index + 1;
    });
  await fs.writeFile(RUTA_DATOS, JSON.stringify(peliculas, null, 2), "utf-8");
}

async function getAll() {
    return await fileReader();
}

async function getById(id) {
    const movies = await fileReader();
    return movies.find(movie => movie.id === id) || null;
}

async function create(newMovieData) {
    const movies = await fileReader();
    const nextId = movies.length + 1;

    const newMovie = { id: nextId, ...newMovieData };
    movies.push(newMovie);
    await fileWriter(movies);
    return newMovie;
}

async function update(id, updatedMovieData) {
    const movies = await fileReader();
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) {
        return null;
    }
    movies[index] = { id, ...updatedMovieData };
    await fileWriter(movies);
    return movies[index];
}

async function deleteMovie(id) {
    const movies = await fileReader();
    const index = movies.findIndex(movie => movie.id === id);

    if (index === -1) {
        return null;
    }
    const [deletedMovie] = movies.splice(index, 1);
    await fileWriter(movies);
    return deletedMovie;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteMovie
};