import { BASE_URL } from '../../../shared/config/api'

export const fetchCoursesData = async (userId: string) => {
	try {
		const response = await fetch(
			`https://${BASE_URL}.ru/usercoursewd?id=${userId}`
		)
		const result = await response.json()

		if (response.status === 200) {
			return result
		} else {
			console.log('Failed to fetch courses data')
		}
	} catch (error) {
		console.log('Error fetching data:', error)
	}
}
