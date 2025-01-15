import { IFeedback } from '../model/types'

export const calculateRating = (feedback: IFeedback[]) => {
	const totalRate = feedback.reduce((sum, { rate }) => sum + rate, 0)
	return Math.round((totalRate / feedback.length) * 100) / 100
}
