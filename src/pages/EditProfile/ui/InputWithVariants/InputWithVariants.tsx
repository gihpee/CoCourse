import { ChangeEvent, FC, ReactNode } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './InputWithVariants.module.css'

interface IInputWithVariants {
	text: string
	children?: ReactNode
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
	inputValueSubjectComponent: string
}

const InputWithVariants: FC<IInputWithVariants> = ({
	text,
	children,
	onChange,
	onClick,
	inputValueSubjectComponent,
}) => {
	return (
		<div className={styles['inputWithVariants']} onClick={onClick}>
			<img
				className={styles['inputWithVariants__icon']}
				src={LinkArrow}
				alt='Открыть список'
			/>
			{children}
			<input
				className={styles['inputWithVariants__input']}
				placeholder={text}
				onChange={onChange}
				value={inputValueSubjectComponent}
			/>
		</div>
	)
}

export default InputWithVariants
