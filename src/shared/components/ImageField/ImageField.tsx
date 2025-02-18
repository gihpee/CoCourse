import { FC, useState } from 'react'
import styles from './ImageField.module.css'

interface IImageField {
	link: string
	text: string
}

const ImageField: FC<IImageField> = ({ link, text }) => {
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
				<label className={styles['image-field__label']}>
					<input
						type='file'
						style={{ display: 'none' }}
						onChange={handleFileChange}
					/>
					<div className={styles['image-field__button']}>
						{file ? (
							<span
								style={{
									textTransform: 'none',
									margin: '0',
									fontSize: 'inherit',
									color: 'white',
								}}
							>
								{file.name}
							</span>
						) : (
							<span
								style={{
									textTransform: 'none',
									margin: '0',
									fontSize: 'inherit',
									color: '#777',
								}}
							>
								{text}
							</span>
						)}
					</div>
				</label>
			</div>
		</div>
	)
}

export default ImageField
