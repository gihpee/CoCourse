import { useEffect } from "react";

const useAutoResizeTextArea = (bioValue: string) => {
  useEffect(() => {
    const textarea = document.querySelector(
      ".bio_textarea"
    ) as HTMLTextAreaElement;
    if (textarea && bioValue) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [bioValue]);
};

export default useAutoResizeTextArea;
