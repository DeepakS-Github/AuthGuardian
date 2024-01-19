export const notifyType = (statusCode: Number) => {
    if (statusCode === 404 || statusCode === 402) {
      return "info";
    } 
    if (statusCode === 400 ) {
      return "warning";
    }
    if (statusCode === 500) {
      return "error";
    }
    return "success";
  };
  