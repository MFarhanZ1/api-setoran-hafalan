import { PrismaClient } from "@prisma/client";
import { DosenHelper } from "../helpers/dosen.helpers";
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
		const result = await prisma.$queryRaw`
			SELECT 
				CONCAT('20', substring(nim FROM 2 FOR 2)) AS tahun, 
				COUNT(substring(nim FROM 2 FOR 2)) AS total 
			FROM 
				mahasiswa 
			WHERE 
				nip=(SELECT nip FROM dosen WHERE email = ${email})
			GROUP BY 
				substring(nim FROM 2 FOR 2) 
			ORDER BY 
				substring(nim FROM 2 FOR 2) DESC
			LIMIT 8;
		`;

		return (result as { tahun: string; total: string }[]).map((item) => ({
			...item,
			total: Number(item.total), // or item.total.toString() if you prefer strings
		}));
	}

	public static async getMahasiswaPAByEmail(email: string) {
		return await prisma.$queryRaw`
			SELECT 
				email,
				nim, 
				nama
			FROM 
				mahasiswa 
			WHERE 
				nip = (SELECT nip FROM dosen WHERE email = ${email})
			ORDER BY 
				nama;
		`;
	}

	public static async checkExistingSetoran(
		nim: string,
		email_dosen_pa: string,
		nomorSurahInt: number
	) {
		const result = await prisma.$queryRaw`
			SELECT * FROM "setoran" 
			WHERE "nim" = ${nim} 
				AND "nip" = (SELECT "nip" FROM "dosen" WHERE "email" = ${email_dosen_pa}) 
				AND "nomor_surah" = ${nomorSurahInt} 
			LIMIT 1
		`;
		return !((result as any).length == 0);
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
