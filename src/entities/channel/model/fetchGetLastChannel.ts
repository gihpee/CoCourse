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
		const result = await response.json()

		if (response.status === 200) {
			return result
		} else {
			console.log('Failed to fetch channel data')
		}
	} catch (error) {
		console.log('Error fetching data:', error)
	}
}
