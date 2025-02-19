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
	const [isNotify, setIsNotify] = useState(true)
	const [selectedOptionsProfile, setSelectedOptionsProfile] = useState<
		string[]
	>([])

	const userCoursesData = useUserCourses(window.Telegram.WebApp.initData)

	useEffect(() => {
		if (userCoursesData) {
			setUserData(userCoursesData)
			setFeedbacks(userCoursesData.feedback || [])
			setCoursesData(userCoursesData.created_courses || [])
			setIsNotify(userCoursesData.notify || false)
			setSelectedOptionsProfile(userCoursesData.subjects || '')
		}
	}, [userCoursesData])

	return { userData, coursesData, feedbacks, isNotify, selectedOptionsProfile }
}
