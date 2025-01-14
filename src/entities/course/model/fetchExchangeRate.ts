export const fetchExchangeRate = async () => {
  try {
    const response = await fetch(
      "https://tonapi.io/v2/rates?tokens=ton&currencies=rub"
    );
    const data = await response.json();
    return data.rates.TON.prices.RUB;
  } catch (error) {
    console.error("Ошибка при получении данных с API:", error);
    throw error;
  }
};
