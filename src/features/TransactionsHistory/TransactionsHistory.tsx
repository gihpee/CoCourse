import { FC } from 'react'
import { ITransaction } from 'src/entities/course/model/types'
import { TransactionsHistoryList } from 'src/entities/transactions/ui/TransactionsHistoryList'
import styles from './TransactionsHistory.module.css'

interface TransactionsHistoryProps {
	onSelectTransaction: (data: {
		transaction: ITransaction
		tType: string
	}) => void
}

export const TransactionsHistory: FC<TransactionsHistoryProps> = ({
	onSelectTransaction,
}) => {
	return (
		<div className={styles['transactions-history']}>
			<h2 className={styles['transactions-history__title']}>
				История транзакций
			</h2>
			<TransactionsHistoryList onSelectTransaction={onSelectTransaction} />
		</div>
	)
}
