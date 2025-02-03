import express from "express";
import cors from "cors";
import dosenRoutes from "./src/routes/dosen.routes.js";
import mahasiswaRoutes from "./src/routes/mahasiswa.routes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(dosenRoutes);
app.use(mahasiswaRoutes);
app.use((req, res) => {
  res.status(404).json({
    'response': false,
    'message': 'Waduh, mau nyari apa kamu mas? 😅',
  });
});

app.listen(port, () => {
  console.log(`[INFO] Server is on fire at port ${port}. 🔥`);
});
