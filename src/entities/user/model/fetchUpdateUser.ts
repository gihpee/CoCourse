import { API_BASE_URL } from '../../../shared/config/api'

export const fetchUpdateUser = async (
	isNotify: boolean,
	selectedOptions: string[],
	uniValue: string,
	bioValue: string,
	initData: string
) => {
	await fetch(`${API_BASE_URL}/update-user/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `tma ${initData}`,
		},
		body: JSON.stringify({ isNotify, selectedOptions, uniValue, bioValue }),
	})
}
