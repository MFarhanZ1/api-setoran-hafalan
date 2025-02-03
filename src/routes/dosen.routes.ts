import express from "express";
import { DosenController } from "../controllers/dosen.controllers.js";

const router = express.Router();

router.get(
  "/v1/dosen/:email",
  DosenController.getInfoDosenByEmail
);
router.post(
  "/v1/dosen/setor",
  DosenController.postSetoran
);
router.delete(
  "/v1/dosen/setor/:id_setoran",
  DosenController.deleteSetoranByID
);

export default router;
