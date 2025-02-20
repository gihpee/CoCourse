import { FC } from 'react'
import TelegramPremiumStarIcon from '../../../../shared/assets/course/TelegramPremiumStar.svg'
import styles from './CoursePromotion.module.css'

const CoursePromotion: FC = () => {
	return (
		<button className={styles['course-promotion']}>
			<div className={styles['course-promotion__icon']}>
				<img
					src={TelegramPremiumStarIcon}
					alt='Телеграм звёзды'
					className={styles['course-promotion__icon-img']}
				/>
			</div>
			<div className={styles['course-promotion__content']}>
				<p className={styles['course-promotion__title']}>
					Продвижение своего курса
				</p>
				<p className={styles['course-promotion__subtitle']}>
					Продвинуть курс за звёзды
				</p>
			</div>
		</button>
	)
}

export default CoursePromotion
