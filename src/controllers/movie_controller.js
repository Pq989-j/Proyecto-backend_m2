
import * as MovieModel from "../models/movie_model.js";

export async function getMovies(req, res) {
    try {
        const movies = await MovieModel.getAll();
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor al listar" });
    }
}

export async function getMovie(req, res) {
    try {
        const id = (req.params.id);
        const movie = await MovieModel.getById(id);

        if (!movie) {
            return res.status(404).json({ error: "Película no encontrada" });
        }
        return res.json(movie);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function createMovie(req, res) {
    // Mapeamos los campos del body en inglés: title, director, release
    const { title, director, release } = req.body;

    if (!title || !director || !release) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        const newDoc = await MovieModel.create({ title, director, release });
        return res.status(201).json(newDoc);
    } catch (error) {
        return res.status(500).json({ error: "Error interno al guardar la película" });
    }
}

export async function updateMovie(req, res) {
    const id = (req.params.id);
    const { title, director, release } = req.body;

    if (!title || !director || !release) {
        return res.status(400).json({ error: "Faltan campos obligatorios para PUT" });
    }

    try {
        const updated = await MovieModel.update(id, { title, director, release });
        if (!updated) {
            return res.status(404).json({ error: "Película no encontrada para reemplazar" });
        }
        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ error: "Error interno al actualizar" });
    }
}

export async function deleteMovie(req, res) {
    const id = (req.params.id);

    try {
        const deleted = await MovieModel.deleteMovie(id);
        if (!deleted) {
            return res.status(404).json({ error: "Película no encontrada para borrar" });
        }
        return res.json({ mensaje: "Película eliminada correctamente", deleted });
    } catch (error) {
        return res.status(500).json({ error: "Error interno al borrar" });
    }
}

