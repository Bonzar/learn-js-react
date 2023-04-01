import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { setToken } from "../store/slices/tokenSlice";

export function TokenExtractor() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return null;
}
