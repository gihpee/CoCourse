import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import { fetchWithdraw } from 'src/entities/wallet/model/fetchWithdraw'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import styles from './WalletBalance.module.css'

interface WalletBalanceProps {
	onBalanceChange?: (balance: string) => void
}

export const WalletBalance: FC<WalletBalanceProps> = ({ onBalanceChange }) => {
	const navigate = useNavigate()
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [balance, setBalance] = useState<number>(0)
	const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)

	const formattedBalance = balance.toLocaleString('ru-RU')

	function handleFail() {
		setWithdrawModalOpen(false)
		window.document.body.style.overflow = 'visible'
		document.documentElement.style.overflow = 'visible'
	}

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)
			if (result?.balance !== undefined) {
				const formatted = result.balance.toLocaleString('ru-RU')
				setBalance(result.balance)
				onBalanceChange?.(formatted)
			}
		}
		fetchData()
	}, [id, onBalanceChange])

	const handleWithdraw = async () => {
		console.log(balance)
		if (balance > 6000) {
			const success = await fetchWithdraw()

			console.log('ok')

			if (success) {
				navigate('/profile')
			}
		}
		setWithdrawModalOpen(true)
		window.document.body.style.overflow = 'hidden'
		document.documentElement.style.overflow = 'hidden'
	}

	return (
		<div className={styles['wallet__balance']}>
			<div className={styles['wallet__balance-wrapper']}>
				<h3 className={styles['wallet__balance-title']}>Основной счёт</h3>
				<p className={styles['wallet__balance-amount']}>{formattedBalance} ₽</p>
			</div>
			<button
				className={styles['wallet__balance-withdraw-button']}
				onClick={handleWithdraw}
			>
				Вывод средств
			</button>

			{withdrawModalOpen && (
				<div className={styles['wallet__balance__notification']}>
					<ModalNotification
						title='Внимание'
						text='Вывод средств возможен при балансе от 6000 рублей'
						onClose={handleFail}
					/>
				</div>
			)}
		</div>
	)
}
