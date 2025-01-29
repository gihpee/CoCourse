import { ICourse } from '@/entities/course/model/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useUserCoursesData = (
	id: number,
	navigate: ReturnType<typeof useNavigate>
): ICourse[] | null => {
	const [userCourses, setUserCourses] = useState<ICourse[] | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://comncoursetest.ru/api/user-data/`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `tma ${window.Telegram.WebApp.initData}`,
						},
					}
				)
				const result = await response.json()

				if (response.status === 201) {
					navigate('/registration', { state: { data: result } })
					setUserCourses(null)
				} else {
					setUserCourses(result.bought_courses)
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
