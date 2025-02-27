import { API_BASE_URL } from '../../../shared/config/api'

export const fetchCreateReturnRequest = async ({
	tid,
	reason,
	email,
	receipt,
}: {
	tid: string
	reason: string
	email: string
	receipt: string
}) => {
	const response = await fetch(`${API_BASE_URL}/create-return-request/`, {
		method: 'POST',
		headers: {
			Authorization: `tma ${window.Telegram.WebApp.initData}`,
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({ tid, reason, email, receipt }),
	})

	if (!response.ok) {
		throw new Error('Ошибка при создании запроса возврата')
	}

	return response.json()
}
