import { useEffect, useState } from 'react'
import { ITelegramUser } from './types'

export const fetchUserCourses = (authToken: string): ITelegramUser[] => {
	const [userCourses, setUserCourses] = useState<ITelegramUser[]>([])

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
				setUserCourses(data || [])
			} catch (error) {
				console.error('Ошибка при запросе к серверу:', error)
			}
		}
		fetchUserData()
	}, [authToken])

	return userCourses
}
