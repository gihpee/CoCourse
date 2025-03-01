import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserCoursesData from '../../entities/user/model/useUserCourses'
import NavBar from '../../shared/components/NavBar/NavBar'
import styles from './Feed.module.css'
import { useFeed } from './model/useFeed'
import FeedFilters from './ui/FeedFilters'
import FeedHeader from './ui/FeedHeader'
import FeedList from './ui/FeedList'
import FeedSearch from './ui/FeedSearch'

const Feed = () => {
	var BackButton = window.Telegram.WebApp.BackButton

	if (BackButton.isVisible) {
		BackButton.hide()
	}

	const navigate = useNavigate()
	const [activeFilter, setActiveFilter] = useState('Все курсы')

	const userId = window.Telegram.WebApp.initDataUnsafe.user.id
	const { userCourses } = useUserCoursesData(userId, navigate)

	const {
		inputValue,
		setInputValue,
		filteredData,
		isPending,
		startTransition,
	} = useFeed(activeFilter, userCourses)

	console.log('userCoursesFeed', userCourses)
	console.log(activeFilter)

	return (
		<div className={styles['feed']}>
			<FeedHeader />
			<FeedSearch
				inputValue={inputValue}
				onChange={e => startTransition(() => setInputValue(e.target.value))}
			/>
			<FeedFilters onFilterChange={setActiveFilter} />
			<FeedList filteredCourses={filteredData} isPending={isPending} />
			<NavBar />
		</div>
	)
}

export default Feed
