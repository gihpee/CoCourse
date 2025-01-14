const handleBioChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setBioValue: React.Dispatch<React.SetStateAction<string>>
) => {
  const { value } = e.target;
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
  setBioValue(value);
};

export default handleBioChange;
