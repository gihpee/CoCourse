export const calculateRating = (feedback: { rate: string }[]) => {
	const totalRate = feedback.reduce(
		(sum, { rate }) => sum + parseFloat(rate),
		0
	)
	return Math.round((totalRate / feedback.length) * 100) / 100
}
