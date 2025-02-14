import { useTonAddress } from '@tonconnect/ui-react'
import { FC, useEffect, useState } from 'react'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import MyDataCard from './MyDataCard/MyDataCard'
import PaymentLimits from './PaymentLimits/ui/PaymentLimits/PaymentLimits'
import TransactionsHistory from './PaymentLimits/ui/TransactionsHistory/TransactionsHistory'

const Wallet: FC = () => {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	const [balance, setBalance] = useState<number>(0)
	const [verifyed, setVerifyed] = useState<string | null>(null)
	const [connectedPayments, setConnectedPayments] = useState<boolean>(false)
	const userFriendlyAddress = useTonAddress()

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)

			if (result) {
				setBalance(result.balance)
				setVerifyed(result.verifyed)
				setConnectedPayments(result.connected)
			}
		}

		fetchData()
	}, [id])

	return (
		<div>
			<h1>Кошелёк</h1>
			<div>
				<div>
					<h3>Основной счёт</h3>
					<p>{balance} ₽</p>
				</div>
				<button>Вывод средств</button>
			</div>
			<h2>Мои данные</h2>
			<MyDataCard
				title='Пройдите верификацию'
				description='Пройди верификацию, чтобы создавать объявления и начать зарабатывать на своих знаниях. Проверка занимает 3-4 рабочих дня'
				verifyed={verifyed}
			/>
			<MyDataCard
				title='Подключите выплаты'
				description='Добавь способ выплаты, чтобы мы могли начислять вознаграждения за продажи прямо на карту'
				connectedPayments={connectedPayments}
			/>
			<MyDataCard
				title='Подключите кошелек'
				description='Подключи кошелек, чтобы мы могли начислять вознаграждения за продажи без комиссии'
				userFriendlyAddress={userFriendlyAddress}
			/>

			<PaymentLimits />

			<h2>История транзакций</h2>
			<div>
				<TransactionsHistory
					card='**** **** **** 5678'
					course='Экономика. Ф. Ф. Мартынова. Подготовка к экзамену.'
					courseDate='03.02.23'
					price='+ 10000 ₽'
					transactionDate='03.02.23'
					transactionType='Продажа'
					university='Financial University under the government of RF'
				/>
				<TransactionsHistory
					card='**** **** **** 5678'
					course='Экономика. Ф. Ф. Мартынова. Подготовка к экзамену.'
					courseDate='03.02.23'
					price='+ 10000 ₽'
					transactionDate='03.02.23'
					transactionType='Продажа'
					university='Financial University under the government of RF'
				/>
			</div>
		</div>
	)
}

export default Wallet
