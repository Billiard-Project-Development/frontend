import { isValid, parse } from "date-fns";

export const parseCustomDate = (dateString) => {
  const parsedDate = parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());
  return isValid(parsedDate) ? parsedDate : null;
};
