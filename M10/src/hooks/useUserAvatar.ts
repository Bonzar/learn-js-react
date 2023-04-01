import { useEffect, useState } from "react";
import axios from "axios";
import { decodeRedditImageUrl } from "../utils/js/decodeRedditImageUrl";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/slices/tokenSlice";

interface UserData {
  data: {
    icon_img: string;
  };
}

export function useUserAvatar(username: string) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const token = useAppSelector(selectToken);

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
