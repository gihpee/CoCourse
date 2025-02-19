import { ChangeEvent, FC, FocusEvent, ReactNode } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './InputWithVariants.module.css'

interface IInputWithVariants {
	text: string
	children?: ReactNode
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void
}

const InputWithVariants: FC<IInputWithVariants> = ({
	text,
	children,
	onChange,
	onFocus,
}) => {
	return (
		<div
			className={styles['inputWithVariants']}
			onChange={onChange}
			onFocus={onFocus}
		>
			<p className={styles['inputWithVariants__text']}>{text}</p>
			<img
				className={styles['inputWithVariants__icon']}
				src={LinkArrow}
				alt='Открыть список'
			/>
			{children}
		</div>
	)
}

export default InputWithVariants
