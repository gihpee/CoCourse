import { ICourse } from './types'

const fetchGetCourses = async (): Promise<ICourse[]> => {
	try {
		const response = await fetch(`https://comncourse.ru/api/get-courses/`)
		const data = await response.json()
		return data || []
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

export default fetchGetCourses
