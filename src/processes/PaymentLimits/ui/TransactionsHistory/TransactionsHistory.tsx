import { FC } from 'react'

interface ITransactionsHistory {
	course: string
	university: string
	courseDate: string
	transactionType: string
	card: string
	transactionDate: string
	price: string
}

const TransactionsHistory: FC<ITransactionsHistory> = ({
	course,
	university,
	courseDate,
	transactionType,
	card,
	transactionDate,
	price,
}) => {
	return (
		<div>
			<div>
				<div>
					<h2>{course}</h2>
					<div>
						<p>{university}</p>
						<p>{courseDate}</p>
					</div>
				</div>
				<div>
					<div>
						<h2>{transactionType}</h2>
						<img src='' alt='Транзакция' />
					</div>
					<div>
						<p>{card}</p>
						<p>{transactionDate}</p>
					</div>
				</div>
			</div>

			<div>
				<h2>{price}</h2>
				Статус
			</div>
		</div>
	)
}

export default TransactionsHistory
