import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        director: { type: String, required: true, trim: true },
        release: { type: Number, required: true, trim: true},
        poster: {type: String, required: true},
        genre: {type: Array, required: true}
    },
    { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);

export async function getAll({ page = 1, limit = 20 } = {}) {
    console.log("¡Llegaron al modelo!", { page, limit })
    // Convertimos a números enteros para evitar problemas con strings de la URL
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Calculamos cuántas películas saltarnos
    const skip = (pageNum - 1) * limitNum;

    // Aplicamos los métodos a la consulta de Mongoose
    return await Movie.find()
                      .skip(skip)
                      .limit(limitNum);
}

export async function getById(id) {
    return Movie.findById(id);
}

export async function create(newMovieData) {
 const newMovie = new Movie(newMovieData); 
 return await newMovie.save(); 
}

export async function update(id, updatedMovieData) {
 return await Movie.findByIdAndUpdate(id, updatedMovieData, 
    { new: true, 
    runValidators: true }); 
}

export async function deleteMovie(id) {
    return await Movie.findByIdAndDelete(id);
}

