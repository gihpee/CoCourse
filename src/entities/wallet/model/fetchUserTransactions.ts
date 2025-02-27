import { API_BASE_URL } from '../../../shared/config/api'

export const fetchUserTransactions = async (id: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/user-transactions/?id=${id}`)
		const result = await response.json()
		return result
	} catch (error) {
		console.error('Error fetching data:', error)
		return null
	}
}
