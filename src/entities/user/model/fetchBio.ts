export const fetchBio = async (id: string) => {
  const response = await fetch(`https://commoncourse.io/user?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при запросе к серверу");
  }

  const data = await response.json();
  return data;
};
