import { fetchCreatePassportData } from 'src/entities/wallet/model/fetchCreatePassportData'
import { IFormData } from 'src/entities/wallet/model/types'

export const handleFormSubmit = async (
	formData: IFormData,
	birthDate: Date | null,
	passportDate: Date | null,
	navigate: Function
): Promise<boolean> => {
	const requiredFields = [
		'passportCopy',
		'registrationCopy',
		'Name',
		'Surname',
		'secondName',
		'idNum',
		'Code',
		'Provided',
		'registrationAddress',
		'Inn',
		'Phone',
		'Email',
		'birthDate',
		'passportDate',
	]

	console.log(formData)

	for (const field of requiredFields) {
		if (
			!formData[field as keyof IFormData] &&
			!['birthDate', 'passportDate'].includes(field)
		) {
			console.error(`Ошибка: Поле ${field} не заполнено.`)
			return false
		}
	}

	const formDataToSend = new FormData()
	Object.entries(formData).forEach(([key, value]) => {
		if (value) formDataToSend.append(key, value)
	})

	if (birthDate) formDataToSend.append('birthDate', birthDate.toISOString())
	if (passportDate)
		formDataToSend.append('passportDate', passportDate.toISOString())

	try {
		console.log(formDataToSend)
		const isSuccess = await fetchCreatePassportData(formDataToSend)

		if (isSuccess) {
			navigate('/profile')
			return true
		} else {
			console.error('Ошибка при создании паспортных данных')
			return false
		}
	} catch (error) {
		console.error('Ошибка запроса:', error)
		return false
	}
}
