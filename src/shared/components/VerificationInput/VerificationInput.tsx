import cn from 'classnames'
import { ChangeEvent } from 'react'
import styles from './VerificationInput.module.css'

const VerificationInput = ({
	placeholder,
	inputValue,
	inputFunction,
	inputName,
	className,
}: {
	placeholder: string
	inputValue: string
	inputFunction: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	inputName: string
	className?: string
}) => (
	<>
		{className ? (
			<textarea
				className={cn(styles['verification-input'], className)}
				value={inputValue}
				placeholder={placeholder}
				onChange={inputFunction}
				name={inputName}
			/>
		) : (
			<input
				className={cn(styles['verification-input'], className)}
				type='text'
				value={inputValue}
				placeholder={placeholder}
				onChange={inputFunction}
				name={inputName}
			/>
		)}
	</>
)

export default VerificationInput
