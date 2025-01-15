interface PaymentData {
	id: string
	price: number
	ton_address: string
}

export const handlePay = async (
	paymentMethod: 'Card' | 'Wallet',
	tonConnectUI: any, // Заменить 'any'
	myTransaction: any, // Заменить 'any'
	data: PaymentData,
	address: string,
	navigate: (path: string) => void,
	paymentLink: string
): Promise<void> => {
	if (paymentMethod === 'Wallet') {
		try {
			await tonConnectUI.sendTransaction(myTransaction)
		} catch (e) {
			console.log(e)
			return
		}

		let cid = data.id
		let price = data.price * 0.9
		let method = 'TON Wallet'
		let baddress = address
		let saddress = data.ton_address

		await fetch('https://comncourse.ru/api/success-payment/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `tma ${window.Telegram.WebApp.initData}`,
			},
			body: JSON.stringify({ cid, price, method, baddress, saddress }),
		}).then(() => navigate(`/course/${data.id}`))
	} else {
		window.location.href = paymentLink
	}
}
