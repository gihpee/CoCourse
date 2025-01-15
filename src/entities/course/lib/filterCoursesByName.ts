import { Course } from '../../../pages/Feed/Feed'

export const filterCoursesByName = (courses: Course[], query: string) => {
	return courses.filter(course =>
		course.name.toLowerCase().includes(query.toLowerCase())
	)
}
