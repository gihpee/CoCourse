import { ChangeEvent } from 'react'
import styles from './VerificationInput.module.css'

const VerificationInput = ({
	placeholder,
	inputValue,
	inputFunction,
	inputName,
}: {
	placeholder: string
	inputValue: string
	inputFunction: (e: ChangeEvent<HTMLInputElement>) => void
	inputName: string
}) => (
	<input
		className={styles['verification-input']}
		type='text'
		value={inputValue}
		placeholder={placeholder}
		onChange={inputFunction}
		name={inputName}
	/>
)

export default VerificationInput
