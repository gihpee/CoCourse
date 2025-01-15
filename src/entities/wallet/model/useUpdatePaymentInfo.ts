import { useNavigate } from 'react-router-dom'

export const useUpdatePaymentInfo = (
	formData: { number: string },
	setModalFillOpen: (isOpen: boolean) => void
) => {
	const navigate = useNavigate()

	const updatePaymentInfo = async () => {
		if (!formData.number) {
			setModalFillOpen(true)
			return
		}

		const number = formData.number

		await fetch('https://comncourse.ru/api/update-payment-info/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
			body: JSON.stringify({ number }),
		})

		navigate('/profile')
	}

	return { updatePaymentInfo }
}
