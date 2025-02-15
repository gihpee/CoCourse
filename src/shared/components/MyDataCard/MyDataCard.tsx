import { FC } from 'react'
import LinkArrow from '../../assets/wallet/LinkArrow.svg'
import ApprovedData from '../../shared/assets/wallet/ApprovedData.svg'
import InProgress from '../../shared/assets/wallet/DataInProgress.svg'
import EmptyData from '../../shared/assets/wallet/EmptyData.svg'
import styles from './MyDataCard.module.css'

interface IMyDataCard {
	title: string
	description: string
	verifyed?: string | null
	connectedPayments?: boolean
	userFriendlyAddress?: string
}

const MyDataCard: FC<IMyDataCard> = props => {
	const {
		title,
		description,
		verifyed,
		connectedPayments,
		userFriendlyAddress,
	} = props

	const key =
		verifyed !== undefined
			? 'verifyed'
			: connectedPayments !== undefined
			? 'connectedPayments'
			: userFriendlyAddress !== undefined
			? 'userFriendlyAddress'
			: null

	let imageSrc = EmptyData
	let statusText = 'Не пройдена'

	if (key === 'verifyed') {
		if (verifyed === 'Не пройдена') {
			imageSrc = EmptyData
			statusText = 'Не пройдена'
		} else if (verifyed === 'На проверке') {
			imageSrc = InProgress
			statusText = 'На проверке'
		} else if (verifyed === 'Пройдена') {
			imageSrc = ApprovedData
			statusText = 'Пройдена'
		}
	} else if (key === 'connectedPayments') {
		imageSrc = connectedPayments ? ApprovedData : EmptyData
		statusText = connectedPayments ? 'Пройдена' : 'Не пройдена'
	} else if (key === 'userFriendlyAddress') {
		imageSrc = userFriendlyAddress ? ApprovedData : EmptyData
		statusText = userFriendlyAddress ? 'Пройдена' : 'Не пройдена'
	}

	return (
		<div className={styles['my-data-card']}>
			<div className={styles['my-data-card__wrapper-status']}>
				<div className={styles['my-data-card__status']}>
					<img
						src={imageSrc}
						alt={statusText}
						className={styles['my-data-card__status-icon']}
					/>
					<p className={styles['my-data-card__status-text']}>{statusText}</p>
				</div>
				<img
					src={LinkArrow}
					alt='Перехад по ссылке'
					className={styles['my-data-card__link-icon']}
				/>
			</div>
			<h3 className={styles['my-data-card__title']}>{title}</h3>
			<p className={styles['my-data-card__description']}>{description}</p>
		</div>
	)
}

export default MyDataCard
