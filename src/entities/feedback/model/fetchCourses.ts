const fetchCourses = async (id: string) => {
  try {
    const response = await fetch(
      `https://comncourse.ru/api/get-courses/?id=${id}`
    );
    const data = await response.json();
    return data.feedback;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchCourses;
