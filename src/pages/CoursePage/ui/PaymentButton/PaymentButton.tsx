import cn from 'classnames'
import { FC } from 'react'
import styles from './PaymentButton.module.css'

interface IPaymentButton {
	path?: string
	pathCrypto?: string
	isCrypto: boolean
	isActive?: boolean
	onClick?: () => void
}

const PaymentButton: FC<IPaymentButton> = ({
	path,
	pathCrypto,
	isCrypto,
	isActive,
	onClick,
}) => {
	return (
		<button
			className={cn(styles['payment-button'], {
				[styles['payment-button_isActive']]: isActive,
			})}
			onClick={onClick}
		>
			{isCrypto ? (
				<>
					<img
						src={pathCrypto}
						alt='Способ оплаты'
						className={styles['payment-button__icon']}
					/>
					<div className={styles['payment-button__details']}>
						<p className={styles['payment-button__discount']}>
							-10% при оплате
						</p>
						<p className={styles['payment-button__text']}>Оплата криптой</p>
					</div>
				</>
			) : (
				<>
					<img
						src={path}
						alt='Способ оплаты'
						className={styles['payment-button__icon']}
					/>
					<p className={styles['payment-button__text']}>Оплата картой</p>
				</>
			)}
		</button>
	)
}

export default PaymentButton
