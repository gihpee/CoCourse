export const fetchGetLastChannel = async () => {
	try {
		const response = await fetch(
			`https://comncourse.ru/api/get-last-channel/`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `tma ${window.Telegram.WebApp.initData}`,
				},
			}
		)

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`HTTP ${response.status}: ${errorText}`)
		}

		const result = await response.json()
		console.log('API Response:', result)
		return result
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}
