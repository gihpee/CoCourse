import { API_BASE_URL } from '../../../shared/config/api'

export const publishCourse = async (cid: string, formData: any) => {
	const { Price, Univ, Desc, Subject, topics } = formData
	const is_draft = false

	console.log(formData)

	try {
		const response = await fetch(`${API_BASE_URL}/edit-course/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
			body: JSON.stringify({
				cid,
				university: Univ,
				description: Desc,
				subjects: Subject,
				topics,
				is_draft,
				price: Price,
			}),
		})

		if (!response.ok) {
			console.log('Ошибка при публикации курса')
		}
		return response.json()
	} catch (error) {
		console.log('Error during course publish:', error)
	}
}
