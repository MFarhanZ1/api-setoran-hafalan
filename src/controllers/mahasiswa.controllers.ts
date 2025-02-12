import { Request, Response } from "express";
import { MahasiswaService } from "../services/mahasiswa.services.js";
import { RequestPayloadProps } from "../types/common.interface.js";

class MahasiswaController {
	public static async getInfoMahasiswaByEmail(req: Request, res: Response) {
		const { email } = req.params;
		try {
			const resultInfoMahasiswaByEmail =
				await MahasiswaService.getInfoMahasiswaByEmail(email);
			if (!resultInfoMahasiswaByEmail) {
				return res.status(404).json({
					response: false,
					message: "Oops! data mahasiswa tidak ditemukan. 😭",
				});
			}
			const resultRingkasanSetoranMahasiswaByNIM =
				await MahasiswaService.getRingkasanSetoranMahasiswaByNIM(
					resultInfoMahasiswaByEmail.nim
				);
			const resultDetailSetoranMahasiswaByNIM =
				await MahasiswaService.getDetailSetoranMahasiswaByNIM(
					resultInfoMahasiswaByEmail.nim
				);
			const resultInfoDasarSetoran = await MahasiswaService.getinfoDasarSetoranMahasiswaByNIM(resultInfoMahasiswaByEmail.nim);
			return res.status(200).json({
				response: true,
				message:
					"Berikut info detail mahasiswa beserta riwayat setoran-nya! 😁",
				data: {
					info: resultInfoMahasiswaByEmail,
					setoran: {
						info_dasar: resultInfoDasarSetoran,
						ringkasan: resultRingkasanSetoranMahasiswaByNIM,
						detail: resultDetailSetoranMahasiswaByNIM,
					},
				},
			});
		} catch (error) {
			console.error(`[ERROR] ${error}`);
			return res.status(500).json({
				response: false,
				message: "Oops! ada kesalahan di server kami 😭",
			});
		}
	}

	public static async getSetoranSaya(req: Request, res: Response) {
		const { email } = (req as RequestPayloadProps);
		if (!email) {
			return res.status(400).json({
				response: false,
				message: "Waduh, email-nya kagak ada mas! 😡",
			});
		}
		try {
			const resultInfoMahasiswaByEmail =
				await MahasiswaService.getInfoMahasiswaByEmail(email);
			if (!resultInfoMahasiswaByEmail) {
				return res.status(404).json({
					response: false,
					message: "Oops! data mahasiswa tidak ditemukan. 😭",
				});
			}
			const resultRingkasanSetoranMahasiswaByNIM =
				await MahasiswaService.getRingkasanSetoranMahasiswaByNIM(
					resultInfoMahasiswaByEmail.nim
				);
			const resultDetailSetoranMahasiswaByNIM =
				await MahasiswaService.getDetailSetoranMahasiswaByNIM(
					resultInfoMahasiswaByEmail.nim
				);
				const resultInfoDasarSetoran = await MahasiswaService.getinfoDasarSetoranMahasiswaByNIM(resultInfoMahasiswaByEmail.nim);

			return res.status(200).json({
				response: true,
				message:
					"Berikut info detail mahasiswa beserta riwayat setoran-nya! 😁",
				data: {
					info: resultInfoMahasiswaByEmail,
					setoran: {
						info_dasar: resultInfoDasarSetoran,
						ringkasan: resultRingkasanSetoranMahasiswaByNIM,
						detail: resultDetailSetoranMahasiswaByNIM,
					},
				},
			});
		} catch (error) {
			console.error(`[ERROR] ${error}`);
			return res.status(500).json({
				response: false,
				message: "Oops! ada kesalahan di server kami 😭",
			});
		}
	}
}

export { MahasiswaController };
