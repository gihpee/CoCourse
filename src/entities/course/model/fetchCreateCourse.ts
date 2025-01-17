export const fetchCreateCourse = async (courseData: {
	university: string
	description: string
	subjects: string
	topics: any
	price: number
	course_id: string
	is_draft: boolean
	address: string
}) => {
	try {
		const response = await fetch('https://comncourse.ru/api/create-course/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
			body: JSON.stringify(courseData),
		})

		if (!response.ok) {
			console.log('Failed to create course')
		}

		return response.json()
	} catch (error) {
		console.log('Error posting course data:', error)
	}
}
