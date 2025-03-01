import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICourse } from '../../../entities/course/model/types'
import { API_BASE_URL } from '../../../shared/config/api'

interface UserCoursesData {
	bought_courses: ICourse[]
}

const useUserCoursesData = (
	id: number,
	navigate: ReturnType<typeof useNavigate>
): {
	userCourses: ICourse[] | null
	isLoading: boolean
	error: string | null
} => {
	const [userCourses, setUserCourses] = useState<ICourse[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const response = await fetch(`${API_BASE_URL}/user-data/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `tma ${window.Telegram.WebApp.initData}`,
					},
				})

				const result: UserCoursesData = await response.json()

				console.log('result', result)

				if (response.status === 201) {
					// Если сервер требует перенаправления на /landing
					sessionStorage.setItem('userCourses', JSON.stringify(result))
					navigate('/landing')
				} else {
					setUserCourses(result.bought_courses)
				}
			} catch (error) {
				console.error('Ошибка загрузки курсов:', error)
				setError('Ошибка загрузки данных')
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [id, navigate])

	return { userCourses, isLoading, error }
}

export default useUserCoursesData
