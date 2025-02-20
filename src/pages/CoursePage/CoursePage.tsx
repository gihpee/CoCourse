import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import { formatDate } from 'src/entities/course/lib/formatDate'
import { ICourse } from 'src/entities/course/model/types'
import { useCourseData } from 'src/entities/course/model/useCourseData'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'
import CourseCard from 'src/features/courses/components/CourseCard/CourseCard'
import Feedback from 'src/shared/components/Feedback/Feedback'
import MainButton from 'src/shared/components/MainButton/MainButton'
import Sales from 'src/shared/components/Sales/Sales'
import Add_Plus from '../../shared/assets/course/Add_Plus.svg'
import Credit_Card from '../../shared/assets/course/Credit_Card.svg'
import Wallet_Card from '../../shared/assets/course/Wallet_Card.svg'
import styles from './CoursePage.module.css'
import CoursePromotion from './ui/CoursePromotion/CoursePromotion'
import PaymentButton from './ui/PaymentButton/PaymentButton'

const CoursePage: FC = () => {
	window.scrollTo(0, 0)
	const { cid } = useParams()
	const { data: courseDataComponent } = useCourseData(cid || '')

	const [isPaid, setIsPaid] = useState<boolean | null>(null)

	const navigate = useNavigate()

	const userCourses = useUserCourses(window.Telegram.WebApp.initData)

	useEffect(() => {
		if (userCourses?.bought_courses && cid) {
			setIsPaid(
				userCourses.bought_courses.some(course => course.id === Number(cid))
			)
		}
	}, [userCourses, cid])

	const averageRate = useMemo(() => {
		const feedback = courseDataComponent?.feedback ?? []
		return feedback.length > 0 ? calculateRating(feedback) : 0
	}, [courseDataComponent?.feedback])

	const isAuthor = courseDataComponent?.user.user_id === userCourses?.user_id

	const topics = useMemo(() => {
		return courseDataComponent?.topics?.map(
			(item: { topic: string; desc: string }, index: number) => (
				<div key={index} className='accordion-item'>
					<input
						type='checkbox'
						name='acor'
						id={`acor${index}`}
						className={styles['course-page__topic-input']}
					/>
					<label
						htmlFor={`acor${index}`}
						className={styles['course-page__topic-label']}
					>
						<p className={styles['course-page__topic-label-text']}>
							{item.topic}
						</p>
						<div className={styles['course-page__wrapper-icon']}>
							<img
								src={Add_Plus}
								className={styles['course-page__topic-icon']}
								alt='Toggle'
							/>
						</div>
					</label>
					<div className={styles['course-page__topic-description']}>
						<p className={styles['course-page__topic-description-text']}>
							{item.desc}
						</p>
					</div>
				</div>
			)
		)
	}, [courseDataComponent?.topics])

	return (
		<div className={styles['user-profile']}>
			<CourseCard
				isCoursePage={true}
				chanelName={courseDataComponent?.channel.name || 'Название курса'}
				chanelPhoto={courseDataComponent?.channel.photo || ''}
				price={courseDataComponent?.price || 0}
				university={userCourses?.university || ''}
				itemCard={courseDataComponent as ICourse}
				isAuthor={isAuthor}
			/>

			<section className={styles['user-profile__stats']}>
				<Sales />
				<Feedback averageRate={averageRate} isCoursePage={true} />
			</section>

			{isAuthor && <CoursePromotion />}

			<div className={styles['course-page__info']}>
				<div className={styles['course-page__section']}>
					<h2 className={styles['course-page__section-title']}>
						Способы оплаты
					</h2>
					<div className={styles['course-page__payment-variants']}>
						<PaymentButton isCrypto={false} path={Credit_Card} />
						<PaymentButton isCrypto={true} pathCrypto={Wallet_Card} />
					</div>
				</div>

				<div className={styles['course-page__divider']}></div>

				<div className={styles['course-page__section']}>
					<h2 className={styles['course-page__section-title']}>Университет</h2>
					<p className={styles['course-page__section-text']}>
						{courseDataComponent?.university?.length
							? courseDataComponent.university
							: 'Не указано'}
					</p>
				</div>

				<div className={styles['course-page__divider']}></div>

				<div className={styles['course-page__section']}>
					<h2 className={styles['course-page__section-title']}>Предмет</h2>
					<div className={styles['course-page__course-wrapper']}>
						<p className={styles['course-page__course-text']}>
							{courseDataComponent?.subject
								? courseDataComponent.subject
								: 'Не указано'}
						</p>
					</div>
				</div>

				<div className={styles['course-page__divider']}></div>

				<div className={styles['course-page__section']}>
					<h2 className={styles['course-page__section-title']}>Описание</h2>
					<p className={styles['course-page__section-text']}>
						{courseDataComponent?.description}
					</p>
				</div>

				<div className={styles['course-page__divider']}></div>

				<div className={styles['course-page__section']}>
					<h2 className={styles['course-page__section-title']}>Содержание</h2>
					{topics && topics.length > 0 ? (
						<div>{topics}</div>
					) : (
						<p className={styles['course-page__section-date']}>Не указано</p>
					)}
				</div>

				<div className={styles['course-page__divider']}></div>

				<div className={styles['course-page__section']}>
					<h2 className={styles['course-page__section-title']}>
						Дата публикации
					</h2>
					<p className={styles['course-page__section-date']}>
						{courseDataComponent?.date
							? formatDate(courseDataComponent.date)
							: 'Дата не указана'}
					</p>
				</div>
			</div>
			<MainButton
				text={
					isPaid || Number(courseDataComponent?.price) === 0
						? 'К учебе'
						: 'Присоединиться'
				}
				onClickEvent={() => {
					if (isPaid || Number(courseDataComponent?.price) === 0) {
						if (courseDataComponent?.channel?.url) {
							window.location.href = courseDataComponent.channel.url
						} else {
							console.log('URL не доступен')
						}
					} else {
						navigate('/buy-course', { state: courseDataComponent })
					}
				}}
			/>
		</div>
	)
}

export default CoursePage
