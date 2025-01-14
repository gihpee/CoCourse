import { useEffect, useState } from 'react'
import { TelegramUser } from './types'

export const useUserCourses = (authToken: string): TelegramUser[] => {
	const [userCourses, setUserCourses] = useState<TelegramUser[]>([])

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
