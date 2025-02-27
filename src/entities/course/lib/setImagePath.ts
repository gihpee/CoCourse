import { BASE_URL } from '../../../shared/config/api'

export const setImagePath = (
	imgPath: string | null | undefined,
	fallback: string
): string => {
	if (!imgPath || imgPath.includes(`https://${BASE_URL}.runull`)) {
		return fallback
	}
	return `https://${BASE_URL}.ru${imgPath}`
}
