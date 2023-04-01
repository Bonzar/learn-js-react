import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/slices/tokenSlice";

interface IPostData {
  data: {
    author: string;
    created: number;
    title: string;
    selftext: string;
    preview?: { images: { source: { url: string } }[] };
    id: string;
    ups: number;
    num_comments: number;
  };
}

export const usePostsData = () => {
  const token = useAppSelector(selectToken);

  const [postsData, setPostsData] = useState<IPostData[]>([]);

  useEffect(() => {
    axios
      .get("https://oauth.reddit.com/best.json?sr_detail=true", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: { data: { data: { children: IPostData[] } } }) => {
        setPostsData(data.data.children);
      })
      .catch(console.error);
  }, []);

  return [postsData];
};
