export const filterOptions = (options: string[], inputValue: string) => {
  return options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );
};
