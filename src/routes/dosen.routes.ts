import express from "express";
import { DosenController } from "../controllers/dosen.controllers.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
	"/dosen/pa/:email",
	AuthMiddleware.tokenExtraction,
	DosenController.getInfoDosenByEmail
);
router.get(
	"/dosen/pa-saya",
	AuthMiddleware.tokenExtraction,
	DosenController.getPASaya
);
router.post(
	"/dosen/setor",
	AuthMiddleware.tokenExtraction,
	DosenController.postSetoran
);
router.delete(
	"/dosen/setor/:id_setoran",
	AuthMiddleware.tokenExtraction,
	DosenController.deleteSetoranByID
);

export default router;
