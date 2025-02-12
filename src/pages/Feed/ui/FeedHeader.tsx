import CreateCourseIcon from '../../../shared/assets/course/CreateCourse.svg'
import styles from '../Feed.module.scss'

const FeedHeader = () => {
	return (
		<div className={styles['feed__header']}>
			<h1 className={styles['feed__title']}>Курсы</h1>
			<button className={styles['feed__create-button']}>
				<img
					src={CreateCourseIcon}
					alt='Создать курс'
					className={styles['feed__create-button-img']}
				/>
			</button>
		</div>
	)
}

export default FeedHeader
