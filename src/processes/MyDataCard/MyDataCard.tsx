import { FC } from 'react'
import ApprovedData from '../../shared/assets/wallet/ApprovedData.svg'
import InProgress from '../../shared/assets/wallet/DataInProgress.svg'
import EmptyData from '../../shared/assets/wallet/EmptyData.svg'

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
		<div>
			<div>
				<img src={imageSrc} alt={statusText} />
				<p>{statusText}</p>
			</div>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	)
}

export default MyDataCard
