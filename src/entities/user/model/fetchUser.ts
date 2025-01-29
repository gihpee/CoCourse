export const fetchUser = async (id: string) => {
	const response = await fetch(
		`https://comncoursetest.ru/api/get-user/?id=${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	if (!response.ok) {
		throw new Error('Ошибка при запросе к серверу')
	}

	const data = await response.json()
	return data
}
