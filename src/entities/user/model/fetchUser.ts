import { API_BASE_URL } from '../../../shared/config/api'

export const fetchUser = async (id: string) => {
	const response = await fetch(`${API_BASE_URL}/get-user/?id=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error('Ошибка при запросе к серверу')
	}

	const data = await response.json()
	return data
}
