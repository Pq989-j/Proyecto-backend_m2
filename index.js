import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
const PORT = 3000;

async function initServer() {
  await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en https://localhost${PORT}`);
    });
}

initServer();


