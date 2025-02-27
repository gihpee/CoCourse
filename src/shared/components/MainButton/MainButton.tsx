import cn from 'classnames'
import { FC } from 'react'
import styles from './MainButton.module.css'

const MainButton: FC<{
	text: string
	onClickEvent: (event: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
}> = ({ text, onClickEvent, className }) => {
	return (
		<button
			className={cn(styles['main-button'], className)}
			onClick={onClickEvent}
		>
			{text}
		</button>
	)
}

export default MainButton
