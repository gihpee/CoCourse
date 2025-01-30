import { useEffect, useState, useTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { filterCourses } from '../../entities/course/lib/filterCourses'
import { filterCoursesByName } from '../../entities/course/lib/filterCoursesByName'
import fetchGetCourses from '../../entities/course/model/fetchGetCourses'
import { ICourse } from '../../entities/course/model/types'
import useUserCoursesData from '../../entities/user/model/useUserCourses'
import Card from '../../shared/card/Card'
import './Feed.css'

function Feed() {
	window.scrollTo(0, 0)
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [data, setData] = useState<ICourse[]>([])
	const [inputValue, setInputValue] = useState('')
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()

	const userCourses = useUserCoursesData(id, navigate)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchGetCourses()
				result.reverse()
				console.log(result)

				setData(result)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	if (!userCourses) {
		return <div className='loading'></div>
	}

	const filteredData = filterCoursesByName(data, inputValue)

	const filteredDataWithMain = filterCourses(filteredData)

	const handleUniChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		startTransition(() => {
			setInputValue(value)
		})
	}

	const appCourses = filteredDataWithMain.map((item: ICourse, index) => (
		<Card itemCard={item} indexCard={index} userCoursesCard={userCourses} />
	))

	return (
		<div className='column' style={{ minHeight: '100vh' }}>
			<div className='feed_top_panel'>
				<Link to={`/profile`} className='profille_btn'></Link>
				<input
					className='billet_search'
					onChange={handleUniChange}
					placeholder='Поиск'
					value={inputValue}
				/>
				<Link to={`/wallet`} className='wallet_btn'></Link>
			</div>
			{!isPending ? appCourses : <div>Загрузка...</div>}
		</div>
	)
}

export default Feed
