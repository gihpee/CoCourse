import { FC } from 'react'
import styles from './LimitSection.module.css'

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
	const progress = (balance / totalCount) * 100

	const formattedBalance = balance.toLocaleString('ru-RU')
	const formattedTotalCount = totalCount.toLocaleString('ru-RU')

	return (
		<div className={styles['limit-section']}>
			<div className={styles['limit-section__header']}>
				<h3 className={styles['limit-section__period']}>{period}</h3>
				<h3 className={styles['limit-section__operation-count']}>
					до {operationCount} операций
				</h3>
			</div>
			<div className={styles['limit-section__progress']}>
				<div className={styles['limit-section__progress-bar']}>
					<div
						className={styles['limit-section__progress-bar-balance']}
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<div className={styles['limit-section__info']}>
					<h3 className={styles['limit-section__remaining']}>
						Осталось {formattedBalance} ₽
					</h3>
					<h3 className={styles['limit-section__total']}>
						из {formattedTotalCount} ₽
					</h3>
				</div>
			</div>
		</div>
	)
}

export default LimitSection
