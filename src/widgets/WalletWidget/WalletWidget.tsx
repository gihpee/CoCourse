import { FC } from 'react'
import PaymentLimits from 'src/features/PaymentLimits/PaymentLimits'
import { TransactionsHistory } from 'src/features/TransactionsHistory/TransactionsHistory'
import { WalletBalance } from 'src/features/WalletBalance/WalletBalance'
import { WalletVerification } from 'src/features/WalletVerification/WalletVerification'
import NavBar from 'src/shared/components/NavBar/NavBar'
import styles from './WalletWidget.module.css'

export const WalletWidget: FC = () => {
	return (
		<div className={styles['wallet']}>
			<h1 className={styles['wallet__title']}>Кошелёк</h1>
			<WalletBalance />
			<WalletVerification />
			<PaymentLimits />
			<TransactionsHistory />
			<NavBar />
		</div>
	)
}
