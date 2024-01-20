export const notifyType = (statusCode: Number | string) => {
  if (typeof statusCode === "string") return statusCode;

  if (statusCode === 404 || statusCode === 402) {
    return "info";
  }
  if (statusCode === 400) {
    return "warning";
  }
  if (statusCode === 500) {
    return "error";
  }
  return "success";
};
