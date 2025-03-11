import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { setImagePath } from '../../../../entities/course/lib/setImagePath'
import CourseInfo from '../../../../entities/course/ui/CourseInfo'
import CourseRating from '../../../../entities/course/ui/CourseRating'
import ShareIcon from '../../../../shared/assets/course/ButtonSend.svg'
import Edit_Pencil from '../../../../shared/assets/course/Edit_Pencil.svg'
import emptyHorizontalImage from '../../../../shared/assets/course/horizontalEmptyCourseImage.webp'
import Camera from '../../../../shared/assets/feedback/Camera.svg'
import { BASE_URL } from '../../../../shared/config/api'
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
	isFeedPage,
	isAuthor,
	isCrypto,
	count,
	cid,
}) => {
	if (!itemCard) return null

	console.log('isAuthor', isAuthor)
	console.log('isCoursePage', isCoursePage)

	const content = (
		<div className={styles['course-card']}>
			{isCoursePage && itemCard?.user ? (
				<div className={styles['course-card__header']}>
					<Link to={`/user/${itemCard?.user.user_id}`}>
						<div className={styles['course-card__person']}>
							<div
								className={styles['course-card__person-avatar']}
								style={{
									backgroundImage: `url(https://${BASE_URL}.ru${
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
					</Link>
					{isAuthor ? (
						<div
							className={cn(styles['course-card__buttons'], {
								[styles['course-card__buttons_isCoursePage']]: isCoursePage,
							})}
						>
							{!itemCard.on_moderation && !itemCard.is_draft && (
								<CourseButton
									alt='Поделиться'
									imgSrc={ShareIcon}
									className={{
										[styles['course-card__button_isCoursePage']]: isCoursePage,
									}}
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation()
										const courseLink = `https://t.me/share/url?url=${encodeURIComponent(
											`https://t.me/CoCourseBot/CoCourseApp?startapp=course_${cid}`
										)}`

										if (window.Telegram?.WebApp) {
											window.Telegram.WebApp.openLink(courseLink)
										} else {
											console.error('Telegram WebApp не доступен')
										}
									}}
								/>
							)}
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
							{!itemCard.on_moderation && !itemCard.is_draft && (
								<CourseButton
									alt='Поделиться'
									imgSrc={ShareIcon}
									className={{
										[styles['course-card__button_isCoursePage']]: isCoursePage,
									}}
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.stopPropagation()
										const courseLink = `https://t.me/share/url?url=${encodeURIComponent(
											`https://t.me/CoCourseBot/CoCourseApp?startapp=course_${cid}`
										)}`

										if (window.Telegram?.WebApp) {
											window.Telegram.WebApp.openLink(courseLink)
										} else {
											console.error('Telegram WebApp не доступен')
										}
									}}
								/>
							)}
						</div>
					)}
				</div>
			) : null}

			<div className={styles['course-card__image-wrapper']}>
				{isAuthor && (
					<>
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
										styles['course-card__status-icon_status-maderation']
									)}
								/>
								<p className={styles['course-card__status-text']}>
									На модерации
								</p>
							</div>
						) : !itemCard.on_moderation &&
						  !itemCard.is_draft &&
						  !isCoursePage &&
						  !isFeedPage ? (
							<div className={styles['course-card__status']}>
								<div
									className={cn(
										styles['course-card__status-icon'],
										styles['course-card__status-icon_status-ready']
									)}
								/>
								<p className={styles['course-card__status-text']}>
									Опубликовано
								</p>
							</div>
						) : null}
					</>
				)}

				{!isCoursePage ? (
					<div className={styles['course-card__buttons']}>
						{!itemCard.on_moderation && !itemCard.is_draft && (
							<CourseButton
								alt='Поделиться'
								imgSrc={ShareIcon}
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									const courseLink = `https://t.me/share/url?url=${encodeURIComponent(
										`https://t.me/CoCourseBot/CoCourseApp?startapp=course_${cid}`
									)}`

									if (window.Telegram?.WebApp) {
										window.Telegram.WebApp.openLink(courseLink)
									} else {
										console.error('Telegram WebApp не доступен')
									}
								}}
							/>
						)}
						{isAuthor && (
							<Link to={`/edit-course/${itemCard.id}`}>
								<CourseButton
									alt='Редактировать'
									imgSrc={Edit_Pencil}
									className={{
										[styles['course-card__button_isCoursePage']]: isCoursePage,
									}}
								/>
							</Link>
						)}
					</div>
				) : null}
			</div>

			{!chanelPhoto ? (
				<div
					className={cn(styles['course-card__modal-placeholder'], {
						[styles['course-card__modal-placeholder_isCoursePage']]:
							isCoursePage,
					})}
				>
					<img
						src={Camera}
						alt=''
						className={cn(styles['course-card__modal-placeholder-img'], {
							[styles['course-card__modal-placeholder-img_isCoursePage']]:
								isCoursePage,
						})}
					/>
					<p
						className={cn(styles['course-card__modal-placeholder-text'], {
							[styles['course-card__modal-placeholder-text_isCoursePage']]:
								isCoursePage,
						})}
					>
						Обложка отсутствует
					</p>
				</div>
			) : (
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
			)}

			{!isCoursePage ? (
				<CourseRating
					amountOfStudents={amountOfStudents || 0}
					averageRate={averageRate || 0}
					count={count || 0}
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

	return isCoursePage || isFeedPage ? (
		<Link to={`/course/${itemCard.id}`}>{content}</Link>
	) : (
		content
	)
}

export default CourseCard
