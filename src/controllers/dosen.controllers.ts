import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DosenService } from "../services/dosen.services.js";
import { DosenHelper } from "../helpers/dosen.helpers.js";
import { RequestPayloadProps } from "../types/common.interface.js";

const prisma = new PrismaClient();

class DosenController {
	public static async getInfoDosenByEmail(req: Request, res: Response) {
		const { email } = req.params;
		if (!email) {
			return res.status(400).json({
				response: false,
				message: "Waduh, email-nya kagak ada mas! 😡",
			});
		}
		try {
			const resultInfoDosen = await DosenService.getInfoDosenByEmail(email);
			const resultInfoMahasiswaPerAngkatan =
				await DosenService.getInfoMahasiswaPAPerAngkatanByEmail(email);
			const resultListMahasiswaPA = await DosenService.getMahasiswaPAByEmail(
				email
			);

			if (!resultInfoDosen) {
				return res.status(404).json({
					response: false,
					message: "Oops! data dosen tidak ditemukan. 😭",
				});
			}

			return res.status(200).json({
				response: true,
				message:
					"Berikut info dosen lengkap serta detail mahasiswa per angkatan (max 8 akt)! 😁",
				data: {
					nama: resultInfoDosen!.nama,
					nip: resultInfoDosen!.nip,
					info_mahasiswa_pa: {
						ringkasan: resultInfoMahasiswaPerAngkatan,
						daftar_mahasiswa: resultListMahasiswaPA,
					},
				},
			});
		} catch (error) {
			console.error(`[ERROR] ${error}`);
			return res.status(500).json({
				response: false,
				message: "Oops! ada kesalahan di server kami. 😭",
			});
		}
	}

	public static async getPASaya(req: Request, res: Response) {
		const { email } = (req as RequestPayloadProps);
		if (!email) {
			return res.status(400).json({
				response: false,
				message: "Waduh, email-nya kagak ada mas! 😡",
			});
		}
		try {
			const resultInfoDosen = await DosenService.getInfoDosenByEmail(email);
			const resultInfoMahasiswaPerAngkatan =
				await DosenService.getInfoMahasiswaPAPerAngkatanByEmail(email);
			const resultListMahasiswaPA = await DosenService.getMahasiswaPAByEmail(
				email
			);

			if (!resultInfoDosen) {
				return res.status(404).json({
					response: false,
					message: "Oops! data dosen tidak ditemukan. 😭",
				});
			}

			return res.status(200).json({
				response: true,
				message:
					"Berikut info dosen lengkap serta detail mahasiswa per angkatan (max 8 akt)! 😁",
				data: {
					nama: resultInfoDosen!.nama,
					nip: resultInfoDosen!.nip,
					info_mahasiswa_pa: {
						ringkasan: resultInfoMahasiswaPerAngkatan,
						daftar_mahasiswa: resultListMahasiswaPA,
					},
				},
			});
		} catch (error) {
			console.error(`[ERROR] ${error}`);
			return res.status(500).json({
				response: false,
				message: "Oops! ada kesalahan di server kami. 😭",
			});
		}
	}

	public static async postSetoran(req: Request, res: Response) {
		const { nim, nomor_surah, tgl_setoran } = req.body;
		const email_dosen_pa = (req as RequestPayloadProps).email;

		// Convert nomor_surah to integer if it is a string, and returns err if not
		const nomorSurahInt = parseInt(nomor_surah as string, 10);
		if (isNaN(nomorSurahInt)) {
			return res.status(400).json({
				response: false,
				message: "Waduh, nomor surah-nya salah format mas! 😡",
			});
		}

		// Validasi input
		if (DosenHelper.validatePostSetoran(nim, nomorSurahInt)) {
			return res.status(400).json({
				response: false,
				message: "Waduh, lengkapi dulu datanya mas! 😡",
			});
		}

		await prisma.$transaction(async () => {
			try {
				// Simpan data ke database
				await DosenService.postSetoran(
					nim as string,
					email_dosen_pa as string,
					nomorSurahInt as number,
					tgl_setoran as string
				);

				// Kirim respons sukses
				return res.status(200).json({
					response: true,
					message: "Yeay, proses validasi setoran berhasil! ✨",
				});
			} catch (error) {
				if ((error as any).code === "P2010") {
					return res.status(400).json({
						response: false,
						message: "Maaf, terjadi kesalahan. Bisa jadi mahasiswa yang bersangkutan sudah menyetor surah tersebut, atau data yang Anda masukkan tidak ditemukan di database. Mohon periksa kembali! 😅",
					});
				}
				console.error(`[ERROR] ${error}`);
				return res.status(500).json({
					response: false,
					message: "Oops! ada kesalahan di server kami 😭",
				});
			}
		});
	}

	public static async deleteSetoranByID(req: Request, res: Response) {
		const { id_setoran } = req.params;

		// Validasi input
		if (DosenHelper.validateDeleteSetoran(id_setoran)) {
			return res.status(400).json({
				response: false,
				message: "Waduh, id setoran-nya kagak ada mas, apa yang mau diapus! 😡",
			});
		}

		try {
			await DosenService.deleteSetoranByID(id_setoran as string);
			return res.status(200).json({
				response: true,
				message: "Yeay, data setoran berhasil di-batalkan! ✨",
			});
		} catch (error) {
			if ((error as any).code === "P2025") {
				return res.status(400).json({
					response: false,
					message:
						"Maaf, sepertinya data setoran-nya belum ada di database! 😅",
				});
			}
			console.error(`[ERROR] ${error}`);
			return res.status(500).json({
				response: false,
				message: "Oops! ada kesalahan di server kami 😭",
			});
		}
	}
}

export { DosenController };
