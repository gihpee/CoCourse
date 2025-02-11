import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { calculateRating } from '../../../entities/course/lib/calculateRating'
import { useCourseData } from '../../../entities/course/model/useCourseData'

export const useCourseCard = () => {
	const { cid } = useParams()
	const { data: courseData, isLoading, error } = useCourseData(cid || '')

	const averageRate = useMemo(() => {
		const feedback = courseData?.feedback ?? []
		return feedback.length > 0 ? calculateRating(feedback) : 0
	}, [courseData?.feedback])

	return { courseData, isLoading, error, averageRate }
}
