import { ICourse } from '../model/types'

export const filterCourses = (filteredData: ICourse[]) => {
	return filteredData.reduce((acc, obj) => {
		if (obj.id === 79) {
			acc.unshift(obj)
		} else {
			acc.push(obj)
		}
		return acc
	}, [] as ICourse[])
}
