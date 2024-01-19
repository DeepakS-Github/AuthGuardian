export const formatDate = (isoDateString: string): string => {
  const dateObject = new Date(isoDateString);

  interface Options {
    month: "long";
    day: "numeric";
    year: "numeric";
  }

  // Formatting options for date only
  const options: Options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  // Format the date
  return dateObject.toLocaleDateString("en-US", options);
};
