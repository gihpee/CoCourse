interface TransactionData {
  ton_address?: string;
  price: number;
}

interface Transaction {
  validUntil: number;
  messages: Array<{
    address?: string;
    amount: string;
    // stateInit?: string;
  }>;
}

export const createTransaction = (
  data: TransactionData,
  exchangeRate: number
): Transaction => {
  return {
    validUntil: Math.floor(Date.now() / 1000) + 600, // 60 sec
    messages: [
      {
        address: data?.ton_address,
        amount: String(
          Math.floor(((data?.price * 0.9) / exchangeRate) * 1000000000)
        ),
        // stateInit: "base64bocblahblahblah=="
      },
    ],
  };
};
