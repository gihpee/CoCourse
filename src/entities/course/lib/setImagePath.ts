export const setImagePath = (
	imgPath: string | null | undefined,
	fallback: string
): string => {
	if (!imgPath || imgPath.includes('https://comncoursetest.runull')) {
		return fallback
	}
	return `https://comncoursetest.ru${imgPath}`
}
