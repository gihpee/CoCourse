import { FC } from 'react'
import TransactionCard from 'src/shared/components/TransactionCard/TransactionCard'
import styles from './TransactionsHistoryList.module.css'

export const TransactionsHistoryList: FC = () => {
	return (
		<div className={styles['transactions-history-list']}>
			<h3 className={styles['transactions-history-list__title']}>Сегодня</h3>
			<TransactionCard
				card='**** **** **** 5678'
				course='Экономика. Ф. Ф. Мартынова. Подготовка к экзамену.'
				courseDate='03.02.23'
				price='+ 10000 ₽'
				transactionDate='03.02.23'
				transactionType='Продажа'
				university='Financial University under the government of RF'
			/>
			<TransactionCard
				card='**** **** **** 5678'
				course='Экономика. Ф. Ф. Мартынова. Подготовка к экзамену.'
				courseDate='03.02.23'
				price='+ 10000 ₽'
				transactionDate='03.02.23'
				transactionType='Продажа'
				university='Financial University under the government of RF'
			/>
		</div>
	)
}
