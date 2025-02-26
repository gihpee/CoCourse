const handleBioChangeMinus = (
	e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	setBioValue: React.Dispatch<React.SetStateAction<string>>
) => {
	const { value } = e.target

	setBioValue(value)
}

export default handleBioChangeMinus
