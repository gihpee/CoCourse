import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { setImagePath } from '../../../../entities/course/lib/setImagePath'
import CourseInfo from '../../../../entities/course/ui/CourseInfo'
import CourseRating from '../../../../entities/course/ui/CourseRating'
import ShareIcon from '../../../../shared/assets/course/ButtonSend.svg'
import Edit_Pencil from '../../../../shared/assets/course/Edit_Pencil.svg'
import emptyHorizontalImage from '../../../../shared/assets/course/horizontalEmptyCourseImage.webp'
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
	isAuthor,
	isCrypto,
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
					{isAuthor ? (
						<div
							className={cn(styles['course-card__buttons'], {
								[styles['course-card__buttons_isCoursePage']]: isCoursePage,
							})}
						>
							<CourseButton
								alt='Поделиться'
								imgSrc={ShareIcon}
								className={{
									[styles['course-card__button_isCoursePage']]: isCoursePage,
								}}
							/>
							<Link to={`/edit-course/${itemCard.id}`}>
								<CourseButton
									alt='Редактировать'
									imgSrc={Edit_Pencil}
									className={{
										[styles['course-card__button_isCoursePage']]: isCoursePage,
									}}
								/>
							</Link>
						</div>
					) : (
						<div
							className={cn(styles['course-card__buttons'], {
								[styles['course-card__buttons_isCoursePage']]: isCoursePage,
							})}
						>
							<CourseButton
								alt='Поделиться'
								imgSrc={ShareIcon}
								className={{
									[styles['course-card__button_isCoursePage']]: isCoursePage,
								}}
							/>
						</div>
					)}
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
						<CourseButton alt='Поделиться' imgSrc={ShareIcon} />
					</div>
				) : null}

				<div
					className={cn(styles['course-card__image'], {
						[styles['course-card__image_isCoursePage']]: isCoursePage,
					})}
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
				<h1 className={styles['course-card__price']}>
					{isCrypto ? (price ?? 0) * 0.9 : price ?? 0} ₽
				</h1>
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
