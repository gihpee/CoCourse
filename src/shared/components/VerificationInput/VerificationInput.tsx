import { ChangeEvent } from 'react'

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
		type='text'
		value={inputValue}
		placeholder={placeholder}
		onChange={inputFunction}
		name={inputName}
	/>
)

export default VerificationInput
