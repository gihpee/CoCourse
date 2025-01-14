export interface Feedback {
	user: number
	author: number
	course: number
	date: string
	rate: number
	review: string | null
}

export interface Topic {
	topic: string
	desc: string
}

export interface TelegramUser {
	user_id: number
	username: string | null
	first_name: string | null
	last_name: string | null
	university: string | null
	description: string | null
	subjects: string[]
	feedback: number[]
	notify: boolean
	photo_url: string | null
	created_courses: number[]
	bought_courses: number[]
	registrated: boolean
	verifyed: string
	connected_payments: boolean
	comn: number
	balance: string
	is_staff: boolean
	is_active: boolean
}

export interface Course {
	id: number
	university: string | null
	subject: string | null
	description: string | null
	topics: Topic[]
	feedback: Feedback[]
	date: string | null
	user: TelegramUser
	price: number | null
	channel: Channel
	amount_of_students: number
	is_draft: boolean
	on_moderation: boolean
	ton_address: string | null
	name: string
	image: string
}

export interface Channel {
	user: number
	chat_id: string | null
	date: string | null
	name: string | null
	photo: string | null
	url: string | null
	connected: boolean
	connected_course: number | null
}

export interface Transaction {
	id: number
	course: Course
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

export interface PassportData {
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

export interface ReturnRequest {
	transaction: number
	reason: string
	email: string
	receipt: string
	approved: boolean
}
