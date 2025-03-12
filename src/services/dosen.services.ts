import { PrismaClient } from "@prisma/client";
import { DosenHelper } from "../helpers/dosen.helpers.js";
const prisma = new PrismaClient();

class DosenService {
	public static async getInfoDosenByEmail(email: string) {
		return await prisma.dosen.findFirst({
			where: {
				email: email,
			},
			select: {
				nama: true,
				nip: true,
			},
		});
	}

	public static async getInfoMahasiswaPAPerAngkatanByEmail(email: string) {
		return await prisma.$queryRaw`
			SELECT 
				CONCAT('20', substring(nim FROM 2 FOR 2)) AS tahun, 
				COUNT(substring(nim FROM 2 FOR 2))::int AS total 
			FROM 
				mahasiswa 
			WHERE 
				id_dosen_pa=(SELECT id FROM dosen WHERE email = ${email})
			GROUP BY 
				substring(nim FROM 2 FOR 2) 
			ORDER BY 
				substring(nim FROM 2 FOR 2) DESC
			LIMIT 8;
		`;
	}

	public static async getMahasiswaPAByEmail(email: string) {
		return await prisma.$queryRaw`
		SELECT 
			mahasiswa.email,
			mahasiswa.nim, 
			mahasiswa.nama,
			CONCAT('20', SUBSTRING(mahasiswa.nim FROM 2 FOR 2)) as angkatan,
			CASE 
				WHEN EXTRACT(MONTH FROM CURRENT_DATE) >= 8 THEN (SUBSTRING(EXTRACT(YEAR FROM CURRENT_DATE)::text FROM 2 FOR 4)::int - SUBSTRING(mahasiswa.nim FROM 2 FOR 2)::int) * 2 + 1
				ELSE (SUBSTRING(EXTRACT(YEAR FROM CURRENT_DATE)::text FROM 2 FOR 4)::int - SUBSTRING(mahasiswa.nim FROM 2 FOR 2)::int) * 2
			END as semester,
			JSON_BUILD_OBJECT(
				'total_wajib_setor', (SELECT COUNT(*) FROM surah)::int,
				'total_sudah_setor', COUNT(setoran.id)::int,
				'total_belum_setor', (SELECT COUNT(*) FROM surah)::int - COUNT(setoran.id)::int,
				'persentase_progress_setor', ROUND((COUNT(setoran.id)::numeric / (SELECT COUNT(*) FROM surah)::numeric) * 100, 2)::float,
				'terakhir_setor', CASE
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '1 day' THEN 'Hari ini'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '2 day' THEN 'Kemarin'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '3 day' THEN '2 Hari yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '4 day' THEN '3 Hari yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '5 day' THEN '4 Hari yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '6 day' THEN '5 Hari yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '1 week' THEN 'Minggu ini'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '2 weeks' THEN '2 Minggu yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '3 weeks' THEN '3 Minggu yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '1 month' THEN 'Bulan ini'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '2 months' THEN '2 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '3 months' THEN '3 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '4 months' THEN '4 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '5 months' THEN '5 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '6 months' THEN '6 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '7 months' THEN '7 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '8 months' THEN '8 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '9 months' THEN '9 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '10 months' THEN '10 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '11 months' THEN '11 Bulan yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '1 year' THEN 'Tahun ini'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '2 years' THEN '2 Tahun yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '3 years' THEN '3 Tahun yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '4 years' THEN '4 Tahun yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '5 years' THEN '5 Tahun yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '6 years' THEN '6 Tahun yang lalu'
					WHEN MAX(setoran.tgl_setoran) >= NOW() - INTERVAL '7 years' THEN '7 Tahun yang lalu'
					ELSE 'Belum ada' END,
				'tgl_terakhir_setor', MAX(setoran.tgl_setoran)
			) as info_setoran
		FROM 
			mahasiswa
		LEFT JOIN 
			setoran ON setoran.nim = mahasiswa.nim
		WHERE 
			mahasiswa.id_dosen_pa = (SELECT id FROM dosen WHERE email = ${email})
		GROUP BY 
			mahasiswa.email, mahasiswa.nim, mahasiswa.nama
		ORDER BY 
			mahasiswa.nama;
		`;
	}

	public static async postSetoran(
		nim: string,
		email_dosen_pa: string,
		nomor_surah: number,
		tgl_setoran: string
	) {
		const idSetoran = DosenHelper.getIDSetoran();
		const tglSetoran = tgl_setoran ? new Date(tgl_setoran) : new Date();
		const tglValidasi = new Date();

		return await prisma.$queryRaw`
			INSERT INTO 
				"setoran" ("id", "tgl_setoran", "tgl_validasi", "nim", "nip", "nomor_surah") 
			VALUES (
				${idSetoran}, 
				${tglSetoran}, 
				${tglValidasi}, 
				${nim}, 
				(SELECT nip FROM dosen WHERE email=${email_dosen_pa}), 
				${nomor_surah}
			);
		`;
	}

	public static async deleteSetoranByID(id_setoran: string) {
		return await prisma.setoran.delete({
			where: {
				id: id_setoran,
			},
		});
	}
}
export { DosenService };
