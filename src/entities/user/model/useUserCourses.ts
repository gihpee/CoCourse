import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICourse } from '../../../entities/course/model/types'
import { API_BASE_URL } from '../../../shared/config/api'

const useUserCoursesData = (id: number): ICourse[] | null => {
	const [userCourses, setUserCourses] = useState<ICourse[] | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/user-data/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `tma ${window.Telegram.WebApp.initData}`,
					},
				})
				const result = await response.json()

				console.log('result', result)

				if (response.status === 201) {
					navigate('/landing')
					setUserCourses(null)
				} else {
					setUserCourses(result.bought_courses)
					sessionStorage.setItem(
						'userCourses',
						JSON.stringify(result.bought_courses)
					)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
				setUserCourses(null)
			}
		}

		fetchData()
	}, [id, navigate])

	return userCourses
}

export default useUserCoursesData
