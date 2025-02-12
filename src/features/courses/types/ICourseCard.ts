import { ICourse } from '../../../entities/course/model/types'

export interface ICourseCard {
	itemCard: ICourse
	chanelPhoto: string | null
	amountOfStudents: number
	chanelName: string | null
	university: string | null
	price: number | null
	averageRate: number | null
}
