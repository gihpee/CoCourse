export const fetchCardNumber = async (): Promise<{ number: string }> => {
	const response = await fetch(`https://comncourse.ru/api/get-card-number/`, {
		method: 'POST',
		headers: {
			Authorization: `tma ${window.Telegram.WebApp.initData}`,
		},
	})

	if (!response.ok) {
		throw new Error('Ошибка при запросе к серверу')
	}

	const data = await response.json()
	return data
}
