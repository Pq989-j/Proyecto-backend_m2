const mongoose = require('mongoose');
const dns = require('dns');

async function connectDB() {
    const uri = process.env.MONGODB_URI;
  try {
       if (uri.startsWith("mongodb+srv://")) {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;