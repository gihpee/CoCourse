import { FC } from 'react'

interface ILimitSection {
	period: string
	operationCount: number
	balance: number
	totalCount: number
}

const LimitSection: FC<ILimitSection> = ({
	period,
	operationCount,
	balance,
	totalCount,
}) => {
	return (
		<div>
			<div>
				<h3>{period}</h3>
				<h3>до {operationCount} операций</h3>
			</div>
			<div>
				<div></div>
				<div>
					<h3>Осталось {balance} ₽</h3>
					<h3>из {totalCount} ₽</h3>
				</div>
			</div>
		</div>
	)
}

export default LimitSection
