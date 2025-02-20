import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { setImagePath } from '../../../../entities/course/lib/setImagePath'
import CourseInfo from '../../../../entities/course/ui/CourseInfo'
import CourseRating from '../../../../entities/course/ui/CourseRating'
import HeartIcon from '../../../../shared/assets/course/ButtonHeart.svg'
import ShareIcon from '../../../../shared/assets/course/ButtonSend.svg'
import emptyHorizontalImage from '../../../../shared/assets/course/horizontalEmptyCourseImage.webp'
import TelegramPremiumStarIcon from '../../../../shared/assets/course/TelegramPremiumStar.svg'
import CourseButton from '../../../../shared/CourseButton/CourseButton'
import { ICourseCard } from '../../types/ICourseCard'
import styles from './CourseCard.module.css'

const CourseCard: FC<ICourseCard> = ({
	itemCard,
	chanelPhoto,
	amountOfStudents,
	chanelName,
	university,
	price,
	averageRate,
	isCoursePage,
}) => {
	if (!itemCard) return null

	const content = (
		<div className={styles['course-card']}>
			{isCoursePage && itemCard?.user ? (
				<div className={styles['course-card__header']}>
					<div className={styles['course-card__person']}>
						<div
							className={styles['course-card__person-avatar']}
							style={{
								backgroundImage: `url(https://comncoursetest.ru${
									itemCard.user.photo_url || ''
								})`,
							}}
						></div>
						<h2 className={styles['course-card__person-name']}>
							{`${itemCard.user.first_name || ''} ${
								itemCard.user.last_name || ''
							}`}
						</h2>
					</div>
					<div className={styles['course-card__buttons']}>
						<CourseButton alt='Добавить в избранное' imgSrc={HeartIcon} />
						<CourseButton alt='Поделиться' imgSrc={ShareIcon} />
					</div>
				</div>
			) : null}

			<div className={styles['course-card__image-wrapper']}>
				{itemCard.is_draft && !isCoursePage ? (
					<div className={styles['course-card__status']}>
						<div
							className={cn(
								styles['course-card__status-icon'],
								styles['course-card__status-icon_status-draft']
							)}
						/>
						<p className={styles['course-card__status-text']}>Черновик</p>
					</div>
				) : itemCard.on_moderation && !isCoursePage ? (
					<div className={styles['course-card__status']}>
						<div
							className={cn(
								styles['course-card__status-icon'],
								styles['course-card__status-icon_status-moderation']
							)}
						/>
						<p className={styles['course-card__status-text']}>На модерации</p>
					</div>
				) : null}

				{!isCoursePage ? (
					<div className={styles['course-card__buttons']}>
						<CourseButton alt='Добавить в избранное' imgSrc={HeartIcon} />
						<CourseButton alt='Поделиться' imgSrc={ShareIcon} />
					</div>
				) : null}

				<div
					className={styles['course-card__image']}
					style={{
						backgroundImage: `url(${setImagePath(
							chanelPhoto,
							emptyHorizontalImage
						)})`,
					}}
				/>
			</div>

			{!isCoursePage ? (
				<CourseRating
					amountOfStudents={amountOfStudents || 0}
					averageRate={averageRate || 0}
				/>
			) : null}

			<CourseInfo
				title={chanelName || 'Название курса'}
				university={university || 'Неизвестный университет'}
			/>

			<div className={styles['course-card__footer']}>
				<div className={styles['course-card__telegram-stars']}>
					<img
						src={TelegramPremiumStarIcon}
						alt='Телеграм звёзды'
						className={styles['course-card__stars-img']}
					/>
					<p className={styles['course-card__stars-count']}>12</p>
				</div>
				<h1 className={styles['course-card__price']}>{price} ₽</h1>
			</div>
		</div>
	)

	return isCoursePage ? (
		content
	) : (
		<Link to={`/course/${itemCard.id}`}>{content}</Link>
	)
}

export default CourseCard
