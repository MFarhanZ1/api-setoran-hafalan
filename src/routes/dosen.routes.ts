import express from "express";
import { DosenController } from "../controllers/dosen.controllers.js";

const router = express.Router();

router.get(
  "/dosen/:email",
  DosenController.getInfoDosenByEmail
);
router.post(
  "/dosen/setor",
  DosenController.postSetoran
);
router.delete(
  "/dosen/setor/:id_setoran",
  DosenController.deleteSetoranByID
);

export default router;
