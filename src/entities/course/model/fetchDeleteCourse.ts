export const deleteCourse = async (cid: string) => {
	try {
		const response = await fetch(
			'https://comncoursetest.ru/api/delete-course/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `tma ${window.Telegram.WebApp.initData}`,
				},
				body: JSON.stringify({ cid }),
			}
		)

		if (!response.ok) {
			console.log(`Failed to delete course. Status: ${response.status}`)
		}

		// Попытка прочитать JSON только если ответ в формате JSON
		return response.headers.get('Content-Type')?.includes('application/json')
			? await response.json()
			: null
	} catch (error) {
		console.log('Error deleting course:', error)
	}
}
