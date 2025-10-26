const showFormattedDate = (data, language) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(data).toLocaleDateString(language, options);
};

export { showFormattedDate };
