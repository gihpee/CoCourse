export interface IFeedbackItem {
	user: {
		first_name: string
		last_name: string
		university: string
		photo_url: string
	}
	rate: number
	review: string
}
