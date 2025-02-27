import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../shared/config/api'
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
				const response = await fetch(`${API_BASE_URL}/user-data/`, {
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
