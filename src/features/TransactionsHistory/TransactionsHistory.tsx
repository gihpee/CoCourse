import { FC } from 'react'
import { TransactionsHistoryList } from 'src/entities/transactions/ui/TransactionsHistoryList'
import styles from './TransactionsHistory.module.css'

export const TransactionsHistory: FC = () => {
	return (
		<div className={styles['transactions-history']}>
			<h2>История транзакций</h2>
			<TransactionsHistoryList />
		</div>
	)
}
