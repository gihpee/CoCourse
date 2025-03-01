import cn from 'classnames'
import { ChangeEvent, FC, ReactNode } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'
import styles from './InputWithVariants.module.css'

interface IInputWithVariants {
	text: string
	children?: ReactNode
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
	inputValueSubjectComponent: string
	isValue: boolean
	onClickImg?: (event: React.MouseEvent<HTMLImageElement>) => void
}

const InputWithVariants: FC<IInputWithVariants> = ({
	text,
	children,
	onChange,
	onClick,
	inputValueSubjectComponent,
	isValue,
	onClickImg,
}) => {
	return (
		<div className={styles['inputWithVariants']} onClick={onClick}>
			<img
				className={cn(
					styles['inputWithVariants__icon'],
					isValue ? styles['inputWithVariants__icon-back'] : ''
				)}
				src={LinkArrow}
				alt='Открыть список'
				onClick={onClickImg}
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
