import { FC } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './InputWithVariants.module.css'

interface IInputWithVariants {
	text: string
}

const InputWithVariants: FC<IInputWithVariants> = ({ text }) => {
	return (
		<div className={styles['inputWithVariants']}>
			<p className={styles['inputWithVariants__text']}>{text}</p>
			<img
				className={styles['inputWithVariants__icon']}
				src={LinkArrow}
				alt='Открыть список'
			/>
		</div>
	)
}

export default InputWithVariants
