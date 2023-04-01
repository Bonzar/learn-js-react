import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../context/tokenContext";
import axios from "axios";
import { decodeRedditImageUrl } from "../utils/js/decodeRedditImageUrl";

interface UserData {
  data: {
    icon_img: string;
  };
}

export function useUserAvatar(username: string) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const token = useContext(tokenContext);

  useEffect(() => {
    axios
      .get<UserData>(`https://oauth.reddit.com/user/${username}/about.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setAvatarSrc(decodeRedditImageUrl(data.data.icon_img));
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { avatarSrc, isLoading, error };
}
