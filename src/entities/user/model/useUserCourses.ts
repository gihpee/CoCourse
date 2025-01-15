import { ICourse } from '@/entities/course/model/types'
import { useNavigate } from 'react-router-dom'

const useUserCoursesData = async (
	id: number,
	navigate: ReturnType<typeof useNavigate>
): Promise<ICourse[] | undefined> => {
	try {
		const response = await fetch(`https://comncourse.ru/api/user-data/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
		})
		const result = await response.json()

		if (response.status === 201) {
			navigate('/registration', { state: { data: result } })
			return undefined
		} else {
			return result.bought_courses
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		return undefined
	}
}

export default useUserCoursesData
