import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/slices/tokenSlice";

interface IUserData {
  username?: string;
  avatarSrc?: string;
}

export function useUserData() {
  const token = useAppSelector(selectToken);

  const [userData, setUserData] = useState<IUserData>({});
  useEffect(() => {
    if (!token) return;

    axios
      .get("https://oauth.reddit.com/api/v1/me?raw_json=1", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setUserData({ username: data.name, avatarSrc: data.icon_img });
      })
      .catch(console.error);
  }, [token]);

  return [userData];
}
