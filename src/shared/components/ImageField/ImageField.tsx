import { FC } from 'react'
import styles from './ImageField.module.css'

interface IImageField {
	link: string
	text: string
}

const ImageField: FC<IImageField> = ({ link, text }) => {
	return (
		<div className={styles['image-field']}>
			<div className={styles['image-field__wrapper']}>
				<img
					src={link}
					alt='Прикрепить паспортные данные'
					className={styles['image-field__image']}
				/>
			</div>
			<p className={styles['image-field__text']}>{text}</p>
		</div>
	)
}

export default ImageField
