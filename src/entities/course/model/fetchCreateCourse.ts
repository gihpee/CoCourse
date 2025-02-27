import { API_BASE_URL } from '../../../shared/config/api'

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
	console.log('courseData', courseData)

	try {
		const response = await fetch(`${API_BASE_URL}/create-course/`, {
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
