export interface IFeedback {
	user: ITelegramUser
	author: number
	course: number
	date: string
	rate: number
	review: string | null
}

export interface ITopic {
	topic: string
	desc: string
}

export interface ITelegramUser {
	user_id: number
	username: string | null
	first_name: string | null
	last_name: string | null
	university: string | null
	description: string | null
	subjects: string[]
	feedback: IFeedback[]
	notify: boolean
	photo_url: string | null
	created_courses: ICourse[]
	bought_courses: ICourse[]
	registrated: boolean
	verifyed: string
	connected_payments: boolean
	comn: number
	balance: string
	is_staff: boolean
	is_active: boolean
}

export interface ICourse {
	id: number
	university: string | null
	subject: string | null
	description: string | null
	topics: ITopic[]
	feedback: IFeedback[]
	date: string | null
	user: ITelegramUser
	price: number | null
	channel: IChannel
	amount_of_students: number
	is_draft: boolean
	on_moderation: boolean
	ton_address: string | null
	name: string
	image: string
}

export interface IChannel {
	user: number
	chat_id: string | null
	date: string | null
	name: string | null
	photo: string | null
	url: string | null
	connected: boolean
	connected_course: number | null
}

export interface ITransaction {
	id: number
	course: ICourse
	buyer: number
	seller: number
	date: string
	price: number
	method: string | null
	send: boolean
	state: string | null
	return_status: number
	buyer_address: string | null
	seller_address: string | null
}

export interface IPassportData {
	user: number
	passport_scan: string
	registration_scan: string
	name: string
	surname: string
	second_name: string
	birth_place: string
	birth_date: string
	passport_date: string
	id_num: string
	code: string
	provided: string
	registration_address: string
	inn: string
	phone: string
	email: string
	approved: boolean
}

export interface IReturnRequest {
	transaction: number
	reason: string
	email: string
	receipt: string
	approved: boolean
}

export interface CourseRatingProps {
	amountOfStudents: number
	averageRate: number | null
	count: number
}
