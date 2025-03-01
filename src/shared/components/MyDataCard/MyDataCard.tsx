import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ApprovedData from '../../assets/wallet/ApprovedData.svg'
import InProgress from '../../assets/wallet/DataInProgress.svg'
import EmptyData from '../../assets/wallet/EmptyData.svg'
import LinkArrow from '../../assets/wallet/LinkArrow.svg'
import styles from './MyDataCard.module.css'

interface IMyDataCard {
	title: string
	description: string
	verifyed?: string | null
	connectedPayments?: boolean
	userFriendlyAddress?: string
	path: string
	onClick?: () => void
}

const MyDataCard: FC<IMyDataCard> = props => {
	const {
		title,
		description,
		verifyed,
		connectedPayments,
		userFriendlyAddress,
		path,
		onClick,
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
	let statusClass = styles['my-data-card__status_status-red']

	if (key === 'verifyed') {
		if (verifyed === 'Не пройдена') {
			imageSrc = EmptyData
			statusText = 'Не пройдена'
			statusClass = styles['my-data-card__status_status-red']
		} else if (verifyed === 'На проверке') {
			imageSrc = InProgress
			statusText = 'На проверке'
			statusClass = styles['my-data-card__status_status-yellow']
		} else if (verifyed === 'Пройдена') {
			imageSrc = ApprovedData
			statusText = 'Пройдена'
			statusClass = styles['my-data-card__status_status-green']
		}
	} else if (key === 'connectedPayments') {
		imageSrc = connectedPayments ? ApprovedData : EmptyData
		statusText = connectedPayments ? 'Пройдена' : 'Не пройдена'
		statusClass = connectedPayments
			? styles['my-data-card__status_status-green']
			: styles['my-data-card__status_status-red']
	} else if (key === 'userFriendlyAddress') {
		imageSrc = userFriendlyAddress ? ApprovedData : EmptyData
		statusText = userFriendlyAddress ? 'Пройдена' : 'Не пройдена'
		statusClass = userFriendlyAddress
			? styles['my-data-card__status_status-green']
			: styles['my-data-card__status_status-red']
	}

	const isLinkActive = statusText === 'Не пройдена'

	const CardWrapper: React.ElementType = onClick
		? 'div'
		: isLinkActive
		? Link
		: 'div'

	const cardProps = onClick
		? { className: styles['my-data-card'], onClick }
		: isLinkActive
		? { to: path, className: styles['my-data-card'] }
		: { className: styles['my-data-card'] }

	return (
		<CardWrapper {...cardProps}>
			<div className={styles['my-data-card__wrapper-status']}>
				<div className={styles['my-data-card__status']}>
					<img
						src={imageSrc}
						alt={statusText}
						className={styles['my-data-card__status-icon']}
					/>
					<p className={cn(styles['my-data-card__status-text'], statusClass)}>
						{statusText}
					</p>
				</div>
				{statusText === 'Не пройдена' && (
					<img
						src={LinkArrow}
						alt='Переход по ссылке'
						className={styles['my-data-card__link-icon']}
					/>
				)}
			</div>
			<h3 className={styles['my-data-card__title']}>{title}</h3>
			<p
				className={cn(
					styles['my-data-card__description'],
					styles['my-data-card__description_variant-mini']
				)}
			>
				{description}
			</p>
		</CardWrapper>
	)
}

export default MyDataCard
