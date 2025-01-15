import { useNavigate } from 'react-router-dom'

const useUserCoursesData = async (
	id: number,
	navigate: ReturnType<typeof useNavigate>
) => {
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
		} else {
			return result.bought_courses
		}
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

export default useUserCoursesData
