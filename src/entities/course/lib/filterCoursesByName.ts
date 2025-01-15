import { ICourse } from '../model/types'

export const filterCoursesByName = (courses: ICourse[], query: string) => {
	return courses.filter(course =>
		course.name.toLowerCase().includes(query.toLowerCase())
	)
}
