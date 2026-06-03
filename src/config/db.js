const mongoose = require('mongoose');
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB establecida');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit();
    }
}

module.exports = connectDB;