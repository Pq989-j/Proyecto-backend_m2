import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        director: { type: String, required: true, trim: true },
        release: { type: Number, required: true, trim: true},
    },
    { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export async function getAll() {
    return await Movie.find();
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

