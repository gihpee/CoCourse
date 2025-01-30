import { Suspense, useEffect, useState, useTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { filterCourses } from '../../entities/course/lib/filterCourses'
import fetchGetCourses from '../../entities/course/model/fetchGetCourses'
import { ICourse } from '../../entities/course/model/types'
import useUserCoursesData from '../../entities/user/model/useUserCourses'
import LoadingCard from '../../shared/card/LoadingCard'
import './Feed.css'

// const CardList = lazy(() => import('../../widgets/cardList/CardList'))

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

	// const filteredData = filterCoursesByName(data, inputValue)

	// const filteredDataWithMain = filterCourses(filteredData)

	const handleUniChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		startTransition(() => {
			setInputValue(value)
		})
	}

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

			<Suspense
				fallback={
					<>
						<LoadingCard />
						<LoadingCard />
					</>
				}
			>
				<>
					<LoadingCard />
					<LoadingCard />
				</>
				{/* {!isPending ? (
					<CardList courses={filteredDataWithMain} userCourses={userCourses} />
				) : (
					<div>Загрузка...</div>
				)} */}
			</Suspense>
		</div>
	)
}

export default Feed
