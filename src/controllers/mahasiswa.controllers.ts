import { Request, Response } from "express";
import { MahasiswaService } from "../services/mahasiswa.services.js";

class MahasiswaController {
  public static async getInfoMahasiswaByEmail (req: Request, res: Response) {
    const { email } = req.params;
    try {
      const resultInfoMahasiswaByEmail = await MahasiswaService.getInfoMahasiswaByEmail(email);
      if (!resultInfoMahasiswaByEmail) {
        return res.status(404).json({
          response: false,
          message: "Oops! data mahasiswa tidak ditemukan. 😭",
        });
      }
      const resultRingkasanSetoranMahasiswaByNIM = await MahasiswaService.getRingkasanSetoranMahasiswaByNIM(resultInfoMahasiswaByEmail.nim);
      const resultDetailSetoranMahasiswaByNIM = await MahasiswaService.getDetailSetoranMahasiswaByNIM(resultInfoMahasiswaByEmail.nim);    
      res.status(200).json({
        response: true,
        message: "Berikut info detail mahasiswa beserta riwayat setoran-nya! 😁",
        data: {
          info: resultInfoMahasiswaByEmail,
          setoran: {
            ringkasan: resultRingkasanSetoranMahasiswaByNIM,
            detail: resultDetailSetoranMahasiswaByNIM
          }
        }
      });
    } catch (error) {
      console.error(`[ERROR] ${error}`);
      return res.status(500).json({
        response: false,
        message: "Oops! ada kesalahan di server kami 😭",
      });
    }
  };
}

export { MahasiswaController };