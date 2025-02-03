class DosenHelper {
    public static getIDSetoran(): string {
        const prefix = "SH";
        const currentYear = new Date().getFullYear().toString().slice(-2); // Tahun 2 digit terakhir

        // Menghasilkan 4 karakter acak alfanumerik
        const randomChars = Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase();

        return `${prefix}${currentYear}${randomChars}`;
    }

    public static validasiPostSetoran(nim: string, email_dosen_pa: string, nomor_surah: number): boolean {
        return (!nim || !email_dosen_pa || !nomor_surah);
    }
}

export { DosenHelper };