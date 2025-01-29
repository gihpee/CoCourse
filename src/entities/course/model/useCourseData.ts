import { useEffect, useState } from 'react'
import { ICourse } from './types'

export const useCourseData = (cid: string) => {
	const [data, setData] = useState<ICourse | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await fetch(
					`https://comncoursetest.ru/api/get-courses/?id=${cid}`
				)
				const result = await response.json()
				setData(result)
			} catch (err) {
				setError('Error fetching data')
			} finally {
				setIsLoading(false)
			}
		}

		if (cid) {
			fetchData()
		}
	}, [cid])

	return { data, isLoading, error }
}
