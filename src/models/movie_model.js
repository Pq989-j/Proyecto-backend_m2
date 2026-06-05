const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        director: { type: String, required: true, trim: true },
        release: { type: Number, required: true, trim: true},
    },
    { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
async function getAll() {
    return await Movie.find();
}

async function getById(id) {
    return Movie.findById(id);
}

async function create(newMovieData) {
 const newMovie = new Movie(newMovieData); 
 return await newMovie.save(); 
}

async function update(id, updatedMovieData) {
 return await Movie.findByIdAndUpdate(id, updatedMovieData, 
    { new: true, 
    runValidators: true }); 
}

async function deleteMovie(id) {
    return await Movie.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteMovie
};