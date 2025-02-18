import { FC } from 'react'
import styles from './VerificationInput.module.css'

const VerificationInput: FC<{
	placeholder: string
	inputValue: string
	inputFunction: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ placeholder, inputValue, inputFunction }) => {
	return (
		<input
			className={styles['verification-input']}
			type='text'
			placeholder={placeholder}
			value={inputValue}
			onChange={inputFunction}
		/>
	)
}

export default VerificationInput
