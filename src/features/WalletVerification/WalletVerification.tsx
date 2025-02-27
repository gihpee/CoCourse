import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { FC, useEffect, useState } from 'react'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import MyDataCard from 'src/shared/components/MyDataCard/MyDataCard'
import styles from './WalletVerification.module.css'

export const WalletVerification: FC = () => {
	const [tonConnectUI, setOptions] = useTonConnectUI()
	setOptions({ language: 'ru' })
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [verifyed, setVerifyed] = useState<string | null>(null)
	const [connectedPayments, setConnectedPayments] = useState<boolean>(false)
	const userFriendlyAddress = useTonAddress()

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)
			if (result) {
				setVerifyed(result.verifyed)
				setConnectedPayments(result.connected)
			}
		}
		fetchData()
	}, [id])

	return (
		<div className={styles['wallet__verification']}>
			<h2 className={styles['wallet__verification-title']}>Мои данные</h2>
			<div className={styles['wallet__verification-cards']}>
				<MyDataCard
					title='Пройдите верификацию'
					description='Пройди верификацию, чтобы создавать объявления и начать зарабатывать на своих знаниях. Проверка занимает 3-4 рабочих дня'
					verifyed={verifyed}
					path='/verification-form'
				/>
				<MyDataCard
					title='Подключите выплаты'
					description='Добавь способ выплаты, чтобы мы могли начислять вознаграждения за продажи прямо на карту'
					connectedPayments={connectedPayments}
					path='/connect-payments-form'
				/>
				<MyDataCard
					title='Подключите криптокошелек'
					description='Подключи кошелек, чтобы мы могли начислять вознаграждения за продажи без комиссии'
					userFriendlyAddress={userFriendlyAddress}
					path='/'
					onClick={() => tonConnectUI.openModal()}
				/>
			</div>
		</div>
	)
}
