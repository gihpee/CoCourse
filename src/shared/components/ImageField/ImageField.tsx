import cn from 'classnames'
import { FC, useState } from 'react'
import styles from './ImageField.module.css'

interface IImageField {
	link: string
	text: string
	inputName: string
}

const ImageField: FC<IImageField> = ({ link, text, inputName }) => {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null
		setFile(selectedFile)
	}

	return (
		<div className={styles['image-field']}>
			<div className={styles['image-field__wrapper']}>
				<img
					src={link}
					alt='Прикрепить паспортные данные'
					className={styles['image-field__image']}
				/>
			</div>
			<label className={styles['image-field__label']}>
				<input
					type='file'
					style={{ display: 'none' }}
					onChange={handleFileChange}
					name={inputName}
				/>
				<div className={styles['image-field__button']}>
					{file ? (
						<span
							className={cn(
								styles['image-field__text'],
								styles['image-field__text_is-passed-data']
							)}
						>
							{file.name}
						</span>
					) : (
						<span className={styles['image-field__text']}>{text}</span>
					)}
				</div>
			</label>
		</div>
	)
}

export default ImageField
