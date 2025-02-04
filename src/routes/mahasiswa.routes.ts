import express from "express";
import { MahasiswaController } from "../controllers/mahasiswa.controllers.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
	"/mahasiswa/setoran/:email",
	AuthMiddleware.tokenValidation,
	MahasiswaController.getInfoMahasiswaByEmail
);

router.get(
	"/mahasiswa/setoran-saya",
	AuthMiddleware.tokenValidation,
	MahasiswaController.getSetoranSaya
);

export default router;
