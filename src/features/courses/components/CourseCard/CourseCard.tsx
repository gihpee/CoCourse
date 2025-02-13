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
}) => {
	console.log(itemCard)
	console.log(itemCard.is_draft)

	return (
		<Link to={`/course/${itemCard.id}`} key={itemCard.id}>
			<div className={styles['course-card']}>
				<div className={styles['course-card__image-wrapper']}>
					{itemCard.is_draft ? (
						<div className={styles['course-card__status']}>
							<div
								className={cn(
									styles['course-card__status-icon'],
									styles['course-card__status-icon_status-draft']
								)}
							/>
							<p className={styles['course-card__status-text']}>Черновик</p>
						</div>
					) : itemCard.on_moderation ? (
						<div className={styles['course-card__status']}>
							<div
								className={cn(
									styles['course-card__status-icon'],
									styles['course-card__status-icon_status-maderation']
								)}
							/>
							<p className={styles['course-card__status-text']}>На модерации</p>
						</div>
					) : null}

					<div className={styles['course-card__buttons']}>
						<CourseButton alt='Добавить в избранное' imgSrc={HeartIcon} />
						<CourseButton alt='Поделиться' imgSrc={ShareIcon} />
					</div>
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

				<CourseRating
					amountOfStudents={amountOfStudents || 0}
					averageRate={averageRate}
				/>

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
		</Link>
	)
}

export default CourseCard
