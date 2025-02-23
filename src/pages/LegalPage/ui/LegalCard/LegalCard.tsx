import { FC } from 'react'
import LegalSvg from '../../../../shared/assets/profile/LegalSvg.svg'
import styles from './LegalCard.module.css'

const LegalCard: FC<{ text: string }> = ({ text }) => {
	return (
		<div className={styles['legal-card']}>
			<div className={styles['legal-card__wrapper-icon']}>
				<img
					className={styles['legal-card__icon']}
					src={LegalSvg}
					alt='Правовая информация'
				/>
			</div>
			<h2 className={styles['legal-card__title']}>{text}</h2>
		</div>
	)
}

export default LegalCard
