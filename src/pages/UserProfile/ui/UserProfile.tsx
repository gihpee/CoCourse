import { FC } from 'react'
import { Link } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import CourseCard from 'src/features/courses/components/CourseCard/CourseCard'
import Feedback from 'src/shared/components/Feedback/Feedback'
import NavBar from 'src/shared/components/NavBar/NavBar'
import Sales from 'src/shared/components/Sales/Sales'
import { useUserProfile } from '../model/useUserProfile'
import styles from './UserProfile.module.css'

const UserProfile: FC = () => {
	window.scrollTo(0, 0)

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	const { userData, coursesData, feedbacks } = useUserProfile()

	const totalStudents = coursesData.reduce(
		(sum, course) => sum + course.amount_of_students,
		0
	)

	const userCourses =
		coursesData?.map(item => (
			<CourseCard
				amountOfStudents={item.amount_of_students}
				averageRate={calculateRating(item.feedback || [])}
				chanelName={item.name}
				chanelPhoto={item.image}
				itemCard={item}
				price={item.price}
				university={item.university}
				key={item.id}
				isCoursePage={false}
				cid={String(item.id)}
			/>
		)) || []

	const averageRate = feedbacks.length > 0 ? calculateRating(feedbacks) : 0

	return (
		<div className={styles['user-profile']}>
			<header className={styles['user-profile__header']}>
				<h2 className={styles['user-profile__title']}>Профиль</h2>
				<div
					className={styles['user-profile__avatar']}
					style={{
						backgroundImage: `url(https://comncoursetest.ru${userData?.photo_url})`,
					}}
				/>
				<p className={styles['user-profile__name']}>
					{userData?.first_name} {userData?.last_name}
				</p>
				<Link to={`/edit-profile/${userData?.user_id}`}>
					<button className={styles['user-profile__settings']}>
						Настроить профиль
					</button>
				</Link>
			</header>

			<section className={styles['user-profile__stats']}>
				<Sales count={totalStudents} />
				<Feedback
					averageRate={averageRate}
					isCoursePage={false}
					path={`/user-feedback/${userData?.user_id}`}
					count={feedbacks.length}
				/>
			</section>

			<section className={styles['user-profile__content']}>
				<div className={styles['user-profile__section']}>
					<h3 className={styles['user-profile__section-title']}>Университет</h3>
					<p className={styles['user-profile__section-description']}>
						{userData?.university || 'Университет не указан'}
					</p>
				</div>
				<div className={styles['user-profile__line']} />
				<div className={styles['user-profile__section']}>
					<h3 className={styles['user-profile__section-title']}>Предметы</h3>
					<div className={styles['user-profile__wrapper-subjects']}>
						{userData?.subjects?.length ? (
							userData.subjects.map(option => (
								<div key={option} className={styles['user-profile__subject']}>
									{option}
								</div>
							))
						) : (
							<p className={styles['user-profile__section-description']}>
								Предметы не указаны
							</p>
						)}
					</div>
				</div>
				<div className={styles['user-profile__line']} />
				<div className={styles['user-profile__section']}>
					<h3 className={styles['user-profile__section-title']}>Описание</h3>
					<p className={styles['user-profile__section-description']}>
						{userData?.description || 'Расскажите о себе'}
					</p>
				</div>
				<div className={styles['user-profile__line']} />
				<div className={styles['user-profile__section']}>
					<h3 className={styles['user-profile__section-title']}>Курсы</h3>
					{userCourses.length > 0 ? (
						<div className={styles['user-profile__all-cards']}>
							{userCourses}
						</div>
					) : (
						<p className={styles['user-profile__section-description']}>
							Вы пока не опубликовали ни один курс
						</p>
					)}
				</div>
			</section>
			<NavBar />
		</div>
	)
}

export default UserProfile
