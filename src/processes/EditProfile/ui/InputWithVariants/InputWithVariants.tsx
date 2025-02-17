import { FC } from 'react'
import LinkArrow from '../../../../shared/assets/wallet/LinkArrow.svg'

interface IInputWithVariants {
	text: string
}

const InputWithVariants: FC<IInputWithVariants> = ({ text }) => {
	return (
		<div>
			<p>{text}</p>
			<button>
				<img src={LinkArrow} alt='Открыть список' />
			</button>
		</div>
	)
}

export default InputWithVariants
