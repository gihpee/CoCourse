import cn from 'classnames'
import { FC } from 'react'
import styles from './TransactionCard.module.css'

interface ITransactionsHistory {
	path: string
	name: string
	operationName: string
	count: number
	typeCount: string
	className: string
	sign: string
	onClick?: () => void
}

const TransactionCard: FC<ITransactionsHistory> = ({
	onClick,
	path,
	name,
	operationName,
	count,
	typeCount,
	className,
	sign,
}) => {
	return (
		<div className={styles['transaction-card']} onClick={onClick}>
			<div className={styles['transaction-card__info']}>
				<img className={styles['transaction-card__icon']} src={path} alt='' />
				<div className={styles['transaction-card__details']}>
					<h2 className={styles['transaction-card__name']}>{name}</h2>
					<p className={styles['transaction-card__operation']}>
						{operationName}
					</p>
				</div>
			</div>

			<div className={styles['transaction-card__amount']}>
				<h2 className={cn(styles['transaction-card__value'], className)}>
					{sign} {count} ₽
				</h2>
				{typeCount && (
					<p className={styles['transaction-card__type']}>{typeCount}</p>
				)}
			</div>
		</div>
	)
}

export default TransactionCard
