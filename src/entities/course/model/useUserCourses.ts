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
				const response = await fetch(
					`https://comncoursetest.ru/api/user-data/`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `tma ${authToken}`,
						},
					}
				)
				if (!response.ok) {
					throw new Error(`Ошибка сервера: ${response.status}`)
				}
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
