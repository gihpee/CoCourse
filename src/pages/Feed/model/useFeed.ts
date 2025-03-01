import { useEffect, useMemo, useState, useTransition } from 'react'
import fetchGetCourses from '../../../entities/course/model/fetchGetCourses'
import { ICourse, IFeedback } from '../../../entities/course/model/types'

export const useFeed = (
	activeFilter: string,
	userCourses: ICourse[] | null
) => {
	const [data, setData] = useState<ICourse[]>([])
	const [inputValue, setInputValue] = useState('')
	const [isPending, startTransition] = useTransition()

	console.log('userCourses', userCourses)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchGetCourses()
				setData(result)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	const filteredData = useMemo(() => {
		if (!data.length) return []

		let filteredCourses = [...data]

		console.log('filteredCourses', filteredCourses)
		console.log('activeFilter', activeFilter)

		if (activeFilter === 'Купленные') {
			const boughtCourseIds = new Set(userCourses?.map(course => course.id))

			filteredCourses = filteredCourses.filter(course =>
				boughtCourseIds.has(course.id)
			)
		} else if (activeFilter === 'Недавние') {
			console.log(
				'Все даты перед сортировкой:',
				filteredCourses.map(c => c.date)
			)

			filteredCourses.sort(
				(a, b) =>
					new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
			)
		} else {
			filteredCourses.sort((a, b) => {
				const getAverageRate = (feedback: IFeedback[]) => {
					if (!feedback.length) return 0
					const totalRate = feedback.reduce(
						(sum, review) => sum + (review.rate || 0),
						0
					)
					return totalRate / feedback.length
				}

				return getAverageRate(b.feedback) - getAverageRate(a.feedback)
			})
		}

		if (inputValue) {
			filteredCourses = filteredCourses.filter(course =>
				course.name.toLowerCase().includes(inputValue.toLowerCase())
			)
		}

		return filteredCourses
	}, [data, inputValue, activeFilter, userCourses])

	return { inputValue, setInputValue, filteredData, isPending, startTransition }
}
