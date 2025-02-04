import express from "express";
import { DosenController } from "../controllers/dosen.controllers.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
	"/dosen/get-mahasiswa/:email",
	AuthMiddleware.tokenValidation,
	DosenController.getInfoDosenByEmail
);
router.get(
	"/dosen/pa-saya",
	AuthMiddleware.tokenValidation,
	DosenController.getPASaya
);
router.post(
	"/dosen/setor",
	AuthMiddleware.tokenValidation,
	DosenController.postSetoran
);
router.delete(
	"/dosen/setor/:id_setoran",
	AuthMiddleware.tokenValidation,
	DosenController.deleteSetoranByID
);

export default router;
