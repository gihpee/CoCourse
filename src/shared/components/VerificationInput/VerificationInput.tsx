import { ChangeEvent } from 'react'

const VerificationInput = ({
	placeholder,
	inputValue,
	inputFunction,
}: {
	placeholder: string
	inputValue: string
	inputFunction: (e: ChangeEvent<HTMLInputElement>) => void
}) => (
	<input
		type='text'
		value={inputValue}
		placeholder={placeholder}
		onChange={inputFunction}
	/>
)

export default VerificationInput
