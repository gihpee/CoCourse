export const fetchWithdraw = async () => {
	const response = await fetch('https://comncourse.ru/api/withdraw/', {
		method: 'POST',
		headers: {
			Authorization: `tma ${window.Telegram.WebApp.initData}`,
		},
	})

	console.log(response)

	if (response.ok) {
		return true
	} else {
		return false
	}
}
