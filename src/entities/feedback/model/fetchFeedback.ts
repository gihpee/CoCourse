export const fetchFeedbacks = async (id: string) => {
	try {
		const response = await fetch(
			`https://comncoursetest.ru/api/get-user/?id=${id}`
		)
		const data = await response.json()
		return data.feedback || []
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}
