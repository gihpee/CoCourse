const fetchUpdateUniversity = (
	id: string | undefined,
	uniValue: string,
	navigate: Function
) => {
	fetch('https://commoncourse.io/update-univ', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({ id, uniValue }),
	}).then(() => navigate(`/edit-profile/${id}`))
}

export default fetchUpdateUniversity
