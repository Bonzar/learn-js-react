import { useEffect, useState } from "react";

export function useToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      setToken(token);
    }
  }, []);

  return [token];
}
