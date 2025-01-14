const fetchUpdateSubjects = (
	id: string | undefined,
	selectedOptions: string[],
	navigate: Function
) => {
	fetch('https://commoncourse.io/update-subjects', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, selectedOptions }),
	}).then(() => navigate(`/edit-profile/${id}`))
}

export default fetchUpdateSubjects
