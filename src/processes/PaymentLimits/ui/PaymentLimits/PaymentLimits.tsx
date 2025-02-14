import { FC } from 'react'
import LimitSection from '../LimitSection/LimitSection'

const PaymentLimits: FC = () => {
	return (
		<div>
			<h2>Лимиты по платежам</h2>
			<div>
				<h3>На 1 операцию</h3>
				<h3>до 150 000 ₽</h3>
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
