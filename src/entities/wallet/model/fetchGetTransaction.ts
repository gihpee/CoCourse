import { API_BASE_URL } from '../../../shared/config/api'

export const fetchTransactionData = async (tid: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/get-transaction/?id=${tid}`)
		if (!response.ok) {
			throw new Error(`Failed to fetch transaction data: ${response.status}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching transaction data:', error)
		throw error
	}
}
