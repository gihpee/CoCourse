import { ICourse } from '@/entities/course/model/types'

const fetchCourses = async (id: string): Promise<ICourse> => {
	try {
		const response = await fetch(
			`https://comncoursetest.ru/api/get-courses/?id=${id}`
		)
		const data = await response.json()
		return data || {}
	} catch (error) {
		console.error('Error fetching course data:', error)
		return {} as ICourse
	}
}

export default fetchCourses
