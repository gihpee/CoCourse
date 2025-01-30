import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { filterCourses } from '../../entities/course/lib/filterCourses'
import { filterCoursesByName } from '../../entities/course/lib/filterCoursesByName'
import fetchGetCourses from '../../entities/course/model/fetchGetCourses'
import { ICourse } from '../../entities/course/model/types'
import useUserCoursesData from '../../entities/user/model/useUserCourses'
import LoadingCard from '../../shared/card/LoadingCard'
import './Feed.css'

const CardList = lazy(() => import('../../widgets/cardList/CardList'))

function Feed() {
	const navigate = useNavigate()
	const [data, setData] = useState<ICourse[]>([])
	const [inputValue, setInputValue] = useState('')
	const [isPending, startTransition] = useTransition()

	const userId = useMemo(
		() => window.Telegram.WebApp.initDataUnsafe.user.id,
		[]
	)

	const userCourses = useUserCoursesData(userId, navigate)

	useEffect(() => {
		window.scrollTo(0, 0)
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

	const handleUniChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value
			startTransition(() => setInputValue(value))
		},
		[]
	)

	const filteredData = useMemo(
		() => filterCourses(filterCoursesByName(data, inputValue)),
		[data, inputValue]
	)

	if (!userCourses) return <div className='loading'></div>

	return (
		<div className='column' style={{ minHeight: '100vh' }}>
			<div className='feed_top_panel'>
				<Link to='/profile' className='profille_btn'></Link>
				<input
					className='billet_search'
					onChange={handleUniChange}
					placeholder='Поиск'
					value={inputValue}
				/>
				<Link to='/wallet' className='wallet_btn'></Link>
			</div>

			<Suspense
				fallback={
					<>
						<LoadingCard />
						<LoadingCard />
					</>
				}
			>
				{isPending ? (
					<div>Загрузка...</div>
				) : (
					<CardList courses={filteredData} userCourses={userCourses} />
				)}
			</Suspense>
		</div>
	)
}

export default Feed
