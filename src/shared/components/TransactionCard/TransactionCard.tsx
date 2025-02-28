import cn from 'classnames'
import { FC } from 'react'
import styles from './TransactionCard.module.css'

interface ITransactionsHistory {
	path: string
	name: string
	operationName: string
	count: string
	typeCount: string
	className: string
}

const TransactionCard: FC<ITransactionsHistory> = ({
	path,
	name,
	operationName,
	count,
	typeCount,
	className,
}) => {
	return (
		<div className={styles['transaction-card']}>
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
					{count} ₽
				</h2>
				{typeCount && (
					<p className={styles['transaction-card__type']}>{typeCount}</p>
				)}
			</div>
		</div>
	)
}

export default TransactionCard
