export const fetchUserTransactions = async (id: string) => {
	try {
		const response = await fetch(
			`https://comncoursetest.ru/api/user-transactions/?id=${id}`
		)
		const result = await response.json()
		return result
	} catch (error) {
		console.error('Error fetching data:', error)
		return null
	}
}
