import { API_BASE_URL } from '../../../shared/config/api'

export const fetchWithdraw = async () => {
	const response = await fetch(`${API_BASE_URL}/withdraw/`, {
		method: 'POST',
		headers: {
			Authorization: `tma ${window.Telegram.WebApp.initData}`,
		},
	})

	if (response.ok) {
		return true
	} else {
		return false
	}
}
