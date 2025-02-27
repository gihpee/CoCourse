import { API_BASE_URL } from '../../../shared/config/api'

export const fetchFeedbacks = async (id: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/get-user/?id=${id}`)
		const data = await response.json()
		return data.feedback || []
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}
