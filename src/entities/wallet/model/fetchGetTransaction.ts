export const fetchTransactionData = async (tid: string) => {
	try {
		const response = await fetch(
			`https://comncourse.ru/api/get-transaction/?id=${tid}`
		)
		if (!response.ok) {
			throw new Error(`Failed to fetch transaction data: ${response.status}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching transaction data:', error)
		throw error
	}
}
