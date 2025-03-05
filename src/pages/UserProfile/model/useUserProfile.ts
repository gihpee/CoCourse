import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app/providers/store'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'
import {
	setLoading,
	setUserProfile,
} from 'src/entities/user/model/userProfileSlice'

export const useUserProfile = () => {
	const dispatch = useDispatch()
	const {
		userData,
		coursesData,
		feedbacks,
		isNotify,
		selectedOptionsProfile,
		uniValueProfile,
		loading,
		error,
	} = useSelector((state: RootState) => state.userProfile)

	const userCoursesData = useUserCourses(window.Telegram.WebApp.initData)

	useEffect(() => {
		if (userCoursesData) {
			dispatch(
				setUserProfile({
					userData: userCoursesData,
					coursesData: userCoursesData.created_courses || [],
					feedbacks: userCoursesData.feedback || [],
					isNotify: userCoursesData.notify || false,
					selectedOptionsProfile: userCoursesData.subjects || [],
					uniValueProfile: userCoursesData.university || '',
				})
			)
		} else {
			dispatch(setLoading(true))
		}
	}, [dispatch, userCoursesData])

	return {
		userData,
		coursesData,
		feedbacks,
		isNotify,
		selectedOptionsProfile,
		uniValueProfile,
		loading,
		error,
	}
}
