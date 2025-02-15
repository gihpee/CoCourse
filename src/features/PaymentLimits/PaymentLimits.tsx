import { FC } from 'react'
import styles from './PaymentLimits.module.css'
import LimitSection from './ui/LimitSection'

const PaymentLimits: FC = () => {
	return (
		<div className={styles['payment-limits']}>
			<h2 className={styles['payment-limits__title']}>Лимиты по платежам</h2>
			<div className={styles['payment-limits__single-operation']}>
				<h3 className={styles['payment-limits__single-operation-title']}>
					На 1 операцию
				</h3>
				<h3 className={styles['payment-limits__single-operation-value']}>
					до 150 000 ₽
				</h3>
			</div>
			<LimitSection
				balance={600_000}
				operationCount={3}
				period='В день'
				totalCount={600_000}
			/>
			<LimitSection
				balance={1_000_000}
				operationCount={8}
				period='В месяц'
				totalCount={1_000_000}
			/>
		</div>
	)
}

export default PaymentLimits
