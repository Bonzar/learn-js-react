import { assoc } from "./assoc";

// it may be replaced with nanoid package
export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15);

export const assignRandomId = <O extends object>(obj: O) =>
  assoc("id", generateRandomString())(obj);
