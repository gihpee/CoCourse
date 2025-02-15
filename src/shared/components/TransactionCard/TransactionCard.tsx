import { FC } from 'react'
import CreditCardSolid from '../../assets/wallet/CreditCardSolid.svg'
import styles from './TransactionCard.module.css'

interface ITransactionsHistory {
	course: string
	university: string
	courseDate: string
	transactionType: string
	card: string
	transactionDate: string
	price: string
}

const TransactionCard: FC<ITransactionsHistory> = ({
	course,
	university,
	courseDate,
	transactionType,
	card,
	transactionDate,
	price,
}) => {
	return (
		<div className={styles['transaction-card']}>
			<div className={styles['transaction-card__header']}>
				<div className={styles['transaction-card__info-course']}>
					<h2 className={styles['transaction-card__course']}>{course}</h2>
					<div className={styles['transaction-card__details']}>
						<p className={styles['transaction-card__university']}>
							{university}
						</p>
						<p className={styles['transaction-card__date']}>{courseDate}</p>
					</div>
				</div>
				<div className={styles['transaction-card__info']}>
					<div className={styles['transaction-card__wrapper-type']}>
						<h2 className={styles['transaction-card__type']}>
							{transactionType}
						</h2>
						<img
							src={CreditCardSolid}
							alt='Транзакция'
							className={styles['transaction-card__icon']}
						/>
					</div>
					<div className={styles['transaction-card__card-info']}>
						<p className={styles['transaction-card__card']}>{card}</p>
						<p className={styles['transaction-card__transaction-date']}>
							{transactionDate}
						</p>
					</div>
				</div>
			</div>

			<div className={styles['transaction-card__footer']}>
				<h2 className={styles['transaction-card__price']}>{price}</h2>
				<p className={styles['transaction-card__status']}>Статус</p>
			</div>
		</div>
	)
}

export default TransactionCard
