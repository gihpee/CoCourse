import { FC } from 'react'
import styles from './MainButton.module.css'

const MainButton: FC<{ text: string }> = ({ text }) => {
	return <button className={styles['main-button']}>{text}</button>
}

export default MainButton
