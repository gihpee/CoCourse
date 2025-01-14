const handleBioChangeMinus = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setBioValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const { value, type } = e.target;

  if (type === "textarea") {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight - 16 + "px";
  }

  setBioValue(value);
};

export default handleBioChangeMinus;
