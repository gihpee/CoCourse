import { FC } from 'react'
import styles from './VerificationInput.module.css'

const VerificationInput: FC<{ placeholder: string }> = ({ placeholder }) => {
	return (
		<input
			className={styles['verification-input']}
			type='text'
			placeholder={placeholder}
		/>
	)
}

export default VerificationInput
