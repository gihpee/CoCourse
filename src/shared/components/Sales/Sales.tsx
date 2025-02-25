import { FC } from 'react'
import BuyersIcon from 'src/shared/assets/course/Buyers.svg'
import styles from './Sales.module.css'

const Sales: FC<{ count: number }> = ({ count }) => {
	return (
		<div className={styles['sales']}>
			<div className={styles['sales__icon']}>
				<img
					src={BuyersIcon}
					alt='Количество продаж'
					className={styles['sales__icon-img']}
				/>
			</div>
			<div className={styles['sales__content']}>
				<h3 className={styles['sales__title']}>Продажи</h3>
				<p className={styles['sales__count']}>{count} раз</p>
			</div>
		</div>
	)
}

export default Sales
