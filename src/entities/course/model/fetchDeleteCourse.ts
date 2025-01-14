export const deleteCourse = async (cid: string) => {
	try {
		const response = await fetch('https://comncourse.ru/api/delete-course/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
			body: JSON.stringify({ cid }),
		})

		if (!response.ok) {
			console.log('Failed to delete course')
		}

		return response.json()
	} catch (error) {
		console.log('Error deleting course:', error)
	}
}
