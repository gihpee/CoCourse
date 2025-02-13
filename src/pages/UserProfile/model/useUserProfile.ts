import { useEffect, useState } from 'react'
import {
	ICourse,
	IFeedback,
	ITelegramUser,
} from 'src/entities/course/model/types'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'

export const useUserProfile = () => {
	const [userData, setUserData] = useState<ITelegramUser | null>(null)
	const [coursesData, setCoursesData] = useState<ICourse[]>([])
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])

	const userCoursesData = useUserCourses(window.Telegram.WebApp.initData)

	useEffect(() => {
		if (userCoursesData) {
			setUserData(userCoursesData)
			setFeedbacks(userCoursesData.feedback || [])
			setCoursesData(userCoursesData.created_courses || [])
		}
	}, [userCoursesData])

	return { userData, coursesData, feedbacks }
}
