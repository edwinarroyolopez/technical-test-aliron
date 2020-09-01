export const errorHandler = (error?: any): any => {
  console.log("errorHandler: ", error);
  throw new Error(error.message);
};
