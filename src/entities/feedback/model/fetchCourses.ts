import { ICourse } from '@/entities/course/model/types'

const fetchCourses = async (id: string): Promise<ICourse[]> => {
	try {
		const response = await fetch(
			`https://comncourse.ru/api/get-courses/?id=${id}`
		)
		const data = await response.json()
		return data || []
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

export default fetchCourses
