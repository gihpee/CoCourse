import { useEffect, useState } from 'react'

export const fetchCourseData = (cid: string) => {
	const [courseData, setCourseData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://comncourse.ru/api/get-courses/?id=${cid}`
				)
				const result = await response.json()
				setCourseData(result)
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}
		fetchData()
	}, [cid])

	return courseData
}
