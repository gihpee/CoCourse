export const fetchCreatePassportData = async (formDataToSend: FormData) => {
	try {
		const response = await fetch(
			'https://comncourse.ru/api/create-passport-data/',
			{
				method: 'POST',
				headers: {
					Authorization: `tma ${window.Telegram.WebApp.initData}`,
				},
				body: formDataToSend,
			}
		)

		if (!response.ok) {
			throw new Error('Ошибка при отправке данных')
		}

		return true
	} catch (error) {
		console.error('Ошибка при отправке паспортных данных:', error)
		return false
	}
}
