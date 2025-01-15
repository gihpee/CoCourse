import { Course } from '../../../pages/Feed/Feed'

export const filterCourses = (filteredData: Course[]) => {
	return filteredData.reduce((acc, obj) => {
		if (obj.id === 79) {
			acc.unshift(obj)
		} else {
			acc.push(obj)
		}
		return acc
	}, [] as Course[])
}
