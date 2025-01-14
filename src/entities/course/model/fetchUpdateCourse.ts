const fetchUpdateCourse = (id: string, cValue: string, navigate: Function) => {
  fetch("https://commoncourse.io/update-course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, cValue }),
  }).then(() => navigate(`/edit-profile/${id}`));
};

export default fetchUpdateCourse;
