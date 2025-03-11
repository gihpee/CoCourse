import { Skeleton } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import { ICourse, ITelegramUser } from 'src/entities/course/model/types'
import { fetchUser } from 'src/entities/user/model/fetchUser'
import CourseCard from 'src/features/courses/components/CourseCard/CourseCard'
import Feedback from 'src/shared/components/Feedback/Feedback'
import NavBar from 'src/shared/components/NavBar/NavBar'
import Sales from 'src/shared/components/Sales/Sales'
import { BASE_URL } from 'src/shared/config/api'
import useTheme from 'src/shared/hooks/useTheme'
import styles from './UserProfile.module.css'

const SellerProfile: FC = () => {
	window.scrollTo(0, 0)

	const { id } = useParams()

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	const user = window.Telegram.WebApp.initDataUnsafe.user

	console.log(user)

	const [userData, setUserData] = useState<ITelegramUser | null>(null)
	const [coursesData, setCoursesData] = useState<ICourse[]>([])
	const [feedbacks, setFeedbacks] = useState([])

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				try {
					const data = await fetchUser(id)

					const transformedCourses = data.created_courses.map(
						(course: ICourse) => ({
							...course,
							feedback: course.feedback.map(rate => ({
								rate: rate.toString(),
							})),
						})
					)

					setUserData(data)
					setCoursesData(transformedCourses)
					setFeedbacks(data.feedback)
				} catch (error) {
					console.error('Ошибка при запросе к серверу:', error)
				}
			}

			fetchData()
		}
	}, [id])

	const isAuthor = Boolean(id) && Number(id) === user?.id

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
				count={item.feedback.length}
				isAuthor={isAuthor}
			/>
		)) || []

	const averageRate =
		feedbacks && feedbacks.length > 0 ? calculateRating(feedbacks) : 0

	const { theme } = useTheme()

	const totalStudents = coursesData.reduce(
		(sum, course) => sum + course.amount_of_students,
		0
	)

	return (
		<div className={styles['user-profile']}>
			<header className={styles['user-profile__header']}>
				<h2 className={styles['user-profile__title']}>Профиль</h2>
				{!userData ? (
					<>
						{theme === 'dark' ? (
							<>
								<Skeleton
									variant='circular'
									animation='wave'
									className={styles['user-profile__skeleton']}
									sx={{ bgcolor: 'grey.800' }}
								/>

								<Skeleton
									variant='rounded'
									animation='wave'
									className={styles['user-profile__skeleton-name']}
									sx={{ bgcolor: 'grey.800' }}
								/>
							</>
						) : theme === 'light' ? (
							<>
								<Skeleton
									variant='circular'
									animation='wave'
									className={styles['user-profile__skeleton']}
									sx={{ bgcolor: 'grey.300' }}
								/>

								<Skeleton
									variant='rounded'
									animation='wave'
									className={styles['user-profile__skeleton-name']}
									sx={{ bgcolor: 'grey.300' }}
								/>
							</>
						) : null}
					</>
				) : (
					<>
						<div
							className={styles['user-profile__avatar']}
							style={{
								backgroundImage: `url(https://${BASE_URL}.ru${userData?.photo_url})`,
							}}
						/>
						<p className={styles['user-profile__name']}>
							{userData?.first_name} {userData?.last_name}
						</p>
					</>
				)}
			</header>

			<section className={styles['user-profile__stats']}>
				<Sales count={totalStudents} />
				<Feedback
					averageRate={averageRate}
					isCoursePage={false}
					path={`/user-feedback/${userData?.user_id}`}
					count={feedbacks.length}
					isAuthor={isAuthor}
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
						<div className={styles['user-profile__empty-cards']}>
							<p className={styles['user-profile__empty-cards-text']}>
								Пока у тебя нет ни одного созданного курса. Чтобы опубликовать
								свой первый курс, перейди на страницу «Курсы» и нажми на плюсик
								в правом верхнем углу экрана
							</p>
						</div>
					)}
				</div>
			</section>
			<NavBar />
		</div>
	)
}

export default SellerProfile
