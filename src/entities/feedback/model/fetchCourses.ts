import { ICourse } from '../../../entities/course/model/types'
import { API_BASE_URL } from '../../../shared/config/api'

const fetchCourses = async (id: string): Promise<ICourse> => {
	try {
		const response = await fetch(`${API_BASE_URL}/get-courses/?id=${id}`)
		const data = await response.json()
		return data || {}
	} catch (error) {
		console.error('Error fetching course data:', error)
		return {} as ICourse
	}
}

export default fetchCourses
