import { useEffect, useMemo, useState, useTransition } from 'react'
import { filterCourses } from '../../../entities/course/lib/filterCourses'
import { filterCoursesByName } from '../../../entities/course/lib/filterCoursesByName'
import fetchGetCourses from '../../../entities/course/model/fetchGetCourses'
import { ICourse } from '../../../entities/course/model/types'

export const useFeed = () => {
	const [data, setData] = useState<ICourse[]>([])
	const [inputValue, setInputValue] = useState('')
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchGetCourses()
				setData(result.slice().reverse())
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	const filteredData = useMemo(
		() => filterCourses(filterCoursesByName(data, inputValue)),
		[data, inputValue]
	)

	return { inputValue, setInputValue, filteredData, isPending, startTransition }
}
