import { FC, useState } from 'react'
import styles from './ImageField.module.css'

interface IImageField {
	link: string
	text: string
	inputName: string
	linkChecked: string
	onFileSelect: (name: string, file: File | null) => void
	textFill: string
}

const ImageField: FC<IImageField> = ({
	link,
	text,
	inputName,
	linkChecked,
	onFileSelect,
	textFill,
}) => {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null
		setFile(selectedFile)
		onFileSelect(inputName, selectedFile)
	}

	return (
		<div className={styles['image-field']}>
			<div className={styles['image-field__wrapper']}>
				{file ? (
					<img
						src={linkChecked}
						alt='Прикрепить паспортные данные'
						className={styles['image-field__image']}
					/>
				) : (
					<img
						src={link}
						alt='Прикрепить паспортные данные'
						className={styles['image-field__image']}
					/>
				)}
			</div>
			<label className={styles['image-field__label']}>
				<input
					type='file'
					style={{ display: 'none' }}
					onChange={handleFileChange}
					name={inputName}
				/>
				<div className={styles['image-field__button']}>
					<span className={styles['image-field__text']}>
						{file ? textFill : text}
					</span>
				</div>
			</label>
		</div>
	)
}

export default ImageField
