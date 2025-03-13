import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface statsInfoSetoranMahasiswaProps {
	label: string;
	total_wajib_setor: number;
	total_sudah_setor: number;
	total_belum_setor: number;
	persentase: number;
}

class MahasiswaService {
	public static async getInfoMahasiswaByEmail(email: string) {
		const result = await prisma.$queryRaw`
        SELECT 
            mhs.nama,
            mhs.nim,
            mhs.email,
			CASE 
				WHEN EXTRACT(MONTH FROM CURRENT_DATE) >= 8 THEN (SUBSTRING(EXTRACT(YEAR FROM CURRENT_DATE)::text FROM 2 FOR 4)::int - SUBSTRING(mhs.nim FROM 2 FOR 2)::int) * 2 + 1
				ELSE (SUBSTRING(EXTRACT(YEAR FROM CURRENT_DATE)::text FROM 2 FOR 4)::int - SUBSTRING(mhs.nim FROM 2 FOR 2)::int) * 2
			END as semester,
            JSON_BUILD_OBJECT(
            'nama', dosen.nama,
            'nip', dosen.nip,
            'email', dosen.email
            ) as dosen_pa
        FROM
            mahasiswa mhs,
            dosen
        WHERE
            mhs.nip = dosen.nip
            AND mhs.email = ${email};
        `;
		return (result as any)[0];
	}

	public static async getRingkasanSetoranMahasiswaByNIM(nim: string) {
		const result = await prisma.$queryRaw`
			SELECT 
				surah.label "label",
				COUNT(*)::int "total_wajib_setor",
				COUNT(setoran.id)::int "total_sudah_setor",
				(COUNT(*)::numeric - COUNT(setoran.id)::numeric)::int AS "total_belum_setor",
				ROUND(
				(COUNT(setoran.id)::numeric / 
					COUNT(*)::numeric
				) * 100, 2
				)::float				
				AS "persentase"
			FROM
				surah
			LEFT JOIN
				setoran ON setoran.nomor_surah = surah.nomor AND setoran.nim = ${nim}
			GROUP BY
				surah.label
			ORDER BY
				CASE
					WHEN surah.label = 'KP' THEN 1
					WHEN surah.label = 'SEMKP' THEN 2
					WHEN surah.label = 'DAFTAR_TA' THEN 3
					WHEN surah.label = 'SEMPRO' THEN 4
					WHEN surah.label = 'SIDANG_TA' THEN 5
					ELSE 6
				END;
		`;

		return result as statsInfoSetoranMahasiswaProps[];
	}

	public static async getDetailSetoranMahasiswaByNIM(nim: string) {
		const result = await prisma.surah.findMany({
			orderBy: {
				nomor: "asc",
			},
			select: {
				nomor: true,
				nama: true, // SELECT SURAH.NAMA
				label: true, // SELECT SURAH.LABEL
				setoran: {
					where: {
						nim: nim, // Kondisi tambahan pada JOIN: ON SETORAN.NIM = nim
					},
					select: {
						id: true, // SELECT SETORAN.ID
						tgl_setoran: true, // SELECT SETORAN.TGL_SETORAN
						tgl_validasi: true, // SELECT SETORAN.TGL_VALIDASI
						dosen: {
							select: {
								nama: true, // SELECT DOSEN.NAMA
							},
						},
					},
				},
			},
		});

		return (result as any).map((surah: any) => ({
			nomor: surah.nomor,
			nama: surah.nama,
			label: surah.label,
			sudah_setor: surah.setoran.length > 0,
			setoran: surah.setoran,
		}));
	}

	public static async getinfoDasarSetoranMahasiswaByNIM(nim: string) {
		const result = await prisma.$queryRaw`
		SELECT 
				(SELECT COUNT(*) FROM surah)::int AS total_wajib_setor,
				COUNT(setoran.id)::int AS total_sudah_setor,
				(SELECT COUNT(*) FROM surah)::int - COUNT(setoran.id)::int AS total_belum_setor,
				ROUND((COUNT(setoran.id)::numeric / (SELECT COUNT(*) FROM surah)::numeric) * 100, 2)::float AS persentase_progress_setor,
				CASE
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
					ELSE 'Belum ada' END AS terakhir_setor,
				MAX(setoran.tgl_setoran) AS tgl_terakhir_setor
		FROM 
			mahasiswa
		LEFT JOIN 
			setoran ON setoran.nim = mahasiswa.nim
		WHERE 
			mahasiswa.nim = ${nim}
		GROUP BY 
			mahasiswa.email, mahasiswa.nim, mahasiswa.nama
		ORDER BY 
			mahasiswa.nama;
		`;
		return (result as any)[0];
	}
}

export { MahasiswaService };