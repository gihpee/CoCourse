import { lazy, Suspense } from 'react'
import { ICourse } from '../../../entities/course/model/types'
import LoadingCard from '../../../shared/card/LoadingCard'
import styles from '../Feed.module.css'

const CardList = lazy(() => import('../../../widgets/cardList/CardList'))

interface FeedListProps {
	filteredCourses: ICourse[]
	isPending: boolean
}

const FeedList = ({ filteredCourses, isPending }: FeedListProps) => {
	return (
		<Suspense
			fallback={
				<div className={styles['feed__loading']}>
					<LoadingCard />
					<LoadingCard />
				</div>
			}
		>
			{isPending ? (
				<div className={styles['feed__loading']}></div>
			) : (
				<CardList courses={filteredCourses} />
			)}
		</Suspense>
	)
}

export default FeedList
