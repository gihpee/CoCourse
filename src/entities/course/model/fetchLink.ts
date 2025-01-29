export const fetchPaymentLink = async (courseId: string, userId: string) => {
	try {
		const response = await fetch(
			`https://comncoursetest.ru/api/get-payment-link/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `tma ${window.Telegram.WebApp.initData}`,
				},
				body: JSON.stringify({ course_id: courseId, user_id: userId }),
			}
		)

		if (!response.ok) {
			throw new Error('Ошибка при запросе к серверу')
		}

		const data = await response.json()
		return data.link
	} catch (error) {
		console.error('Ошибка при запросе к серверу:', error)
		throw error
	}
}
