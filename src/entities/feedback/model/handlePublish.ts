import { useNavigate } from "react-router-dom";

const handlePublish = (
  revValue: string,
  sliderValue: number,
  id: string | undefined,
  setModalFillOpen: (open: boolean) => void,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (revValue === "") {
    setModalFillOpen(true);
  } else {
    fetch("https://comncourse.ru/api/send-feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `tma ${window.Telegram.WebApp.initData}`,
      },
      body: JSON.stringify({ id, revValue, sliderValue }),
    }).then(() => navigate(`/course/${id}`));
  }
};

export default handlePublish;
