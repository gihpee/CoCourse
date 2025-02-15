import { FC, useEffect, useState } from 'react'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import styles from './WalletBalance.module.css'

export const WalletBalance: FC = () => {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [balance, setBalance] = useState<number>(0)

	const formattedBalance = balance.toLocaleString('ru-RU')

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)
			if (result) {
				setBalance(result.balance)
			}
		}
		fetchData()
	}, [id])

	return (
		<div className={styles['wallet__balance']}>
			<div className={styles['wallet__balance-wrapper']}>
				<h3 className={styles['wallet__balance-title']}>Основной счёт</h3>
				<p className={styles['wallet__balance-amount']}>{formattedBalance} ₽</p>
			</div>
			<button className={styles['wallet__balance-withdraw-button']}>
				Вывод средств
			</button>
		</div>
	)
}
