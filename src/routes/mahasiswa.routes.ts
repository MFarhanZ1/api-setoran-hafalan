import express from "express";
import { MahasiswaController } from "../controllers/mahasiswa.controllers.js";

const router = express.Router();

router.get(
  "/mahasiswa/:email",
  MahasiswaController.getInfoMahasiswaByEmail
);

export default router;