import { ICourse } from 'src/entities/course/model/types'

const fetchCourses = async (id: string): Promise<ICourse> => {
	try {
		const response = await fetch(
			`https://comncourse.ru/api/get-courses/?id=${id}`
		)
		const data = await response.json()
		console.log('fetchCoursesComp', data)
		return data || {}
	} catch (error) {
		console.error('Error fetching course data:', error)
		return {} as ICourse
	}
}

export default fetchCourses
