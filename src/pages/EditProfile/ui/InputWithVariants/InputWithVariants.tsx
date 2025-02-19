import { ChangeEvent, FC, ReactNode } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './InputWithVariants.module.css'

interface IInputWithVariants {
	text: string
	children?: ReactNode
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const InputWithVariants: FC<IInputWithVariants> = ({
	text,
	children,
	onChange,
	onClick,
}) => {
	return (
		<div
			className={styles['inputWithVariants']}
			onChange={onChange}
			onClick={onClick}
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
