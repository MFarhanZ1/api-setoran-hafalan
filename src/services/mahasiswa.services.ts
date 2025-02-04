import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface statsInfoSetoranMahasiswaProps {
	label: string;
	jumlah_wajib_setor: number;
	jumlah_sudah_setor: number;
	jumlah_belum_setor: number;
	persentase: string;
}

class MahasiswaService {
	public static async getInfoMahasiswaByEmail(email: string) {
		const result = await prisma.$queryRaw`
        SELECT 
            mhs.nama,
            mhs.nim,
            mhs.email,
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
				COUNT(*) "jumlah_wajib_setor",
				COUNT(setoran.id) "jumlah_sudah_setor",
				(COUNT(*)::numeric - COUNT(setoran.id)::numeric) AS "jumlah_belum_setor",
				CONCAT(
					ROUND(
					(COUNT(setoran.id)::numeric / 
						COUNT(*)::numeric
					) * 100, 2
					)::text					
				) AS "persentase"
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

		return (result as statsInfoSetoranMahasiswaProps[]).map(
			(item: statsInfoSetoranMahasiswaProps) => ({
				label: item.label,
				jumlah_wajib_setor: Number(item.jumlah_wajib_setor),
				jumlah_sudah_setor: Number(item.jumlah_sudah_setor),
				jumlah_belum_setor: Number(item.jumlah_belum_setor),
				persentase: parseFloat(item.persentase),
			})
		);
	}

	public static async getDetailSetoranMahasiswaByNIM(nim: string) {
		return await prisma.surah.findMany({
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
	}
}

export { MahasiswaService };
