import { useEffect, useState } from 'react'
import { ITelegramUser } from './types'

export const useUserCourses = (
	authToken: string
): ITelegramUser | undefined => {
	const [userCourses, setUserCourses] = useState<ITelegramUser | undefined>(
		undefined
	)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`https://comncourse.ru/api/user-data/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `tma ${authToken}`,
					},
				})
				const data = await response.json()
				setUserCourses(data)
			} catch (error) {
				console.error('Ошибка при запросе к серверу:', error)
			}
		}
		fetchUserData()
	}, [authToken])

	return userCourses
}
