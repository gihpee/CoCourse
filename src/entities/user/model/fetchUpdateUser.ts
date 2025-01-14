export const fetchUpdateUser = async (
	isNotify: boolean,
	selectedOptions: string[],
	uniValue: string,
	bioValue: string,
	initData: string
) => {
	await fetch('https://comncourse.ru/api/update-user/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `tma ${initData}`,
		},
		body: JSON.stringify({ isNotify, selectedOptions, uniValue, bioValue }),
	})
}
