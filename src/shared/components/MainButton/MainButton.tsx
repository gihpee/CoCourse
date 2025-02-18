import { FC } from 'react'
import styles from './MainButton.module.css'

const MainButton: FC<{
	text: string
	onClickEvent: (event: React.MouseEvent<HTMLButtonElement>) => void
}> = ({ text, onClickEvent }) => {
	return (
		<button className={styles['main-button']} onClick={onClickEvent}>
			{text}
		</button>
	)
}

export default MainButton
