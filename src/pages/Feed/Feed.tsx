import { useNavigate } from 'react-router-dom'
import useUserCoursesData from '../../entities/user/model/useUserCourses'
import styles from './Feed.module.scss'
import { useFeed } from './model/useFeed'
import FeedFilters from './ui/FeedFilters'
import FeedHeader from './ui/FeedHeader'
import FeedList from './ui/FeedList'
import FeedSearch from './ui/FeedSearch'

const Feed = () => {
	const navigate = useNavigate()
	const {
		inputValue,
		setInputValue,
		filteredData,
		isPending,
		startTransition,
	} = useFeed()

	const userId = window.Telegram.WebApp.initDataUnsafe.user.id
	const userCourses = useUserCoursesData(userId, navigate)

	if (!userCourses) return <div className='loading'></div>

	return (
		<div className={styles['feed']}>
			<FeedHeader />
			<FeedSearch
				inputValue={inputValue}
				onChange={e => startTransition(() => setInputValue(e.target.value))}
			/>
			<FeedFilters />
			<FeedList filteredCourses={filteredData} isPending={isPending} />
		</div>
	)
}

export default Feed
