class DosenHelper {
	public static validatePostSetoran(
		nim: string,
		nomor_surah: number
	): boolean {
		return (
			!nim ||
			!nomor_surah
		);
	}

	public static validateDeleteSetoran(id_setoran: string): boolean {
		return !id_setoran;
	}
}

export { DosenHelper };