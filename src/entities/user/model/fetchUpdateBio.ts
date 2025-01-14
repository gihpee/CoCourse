const fetchUpdateBio = (
	id: string | undefined,
	bioValue: string,
	navigate: Function
) => {
	fetch('https://commoncourse.io/update-bio', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, bioValue }),
	}).then(() => navigate(`/edit-profile/${id}`))
}

export default fetchUpdateBio
