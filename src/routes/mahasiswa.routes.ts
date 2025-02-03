import express from "express";
import {
  getInfoMahasiswaByEmail,
  getInfoSetoranMahasiswaByNIM,
  getAllSetoranMahasiswaByNIM,
} from "../controllers/mahasiswa.controllers.js";

const router = express.Router();

router.get(
  "/mahasiswa/info/:email",
  getInfoMahasiswaByEmail
);
router.get(
  "/mahasiswa/setoran/:nim",
  getAllSetoranMahasiswaByNIM
);
router.get(
  "/mahasiswa/setoran/info/:nim",
  getInfoSetoranMahasiswaByNIM
);

export default router;
