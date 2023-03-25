import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../context/tokenContext";
import axios from "axios";

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
  const token = useContext(tokenContext);

  const [postsData, setPostsData] = useState<IPostData[]>([]);

  useEffect(() => {
    axios
      .get("https://oauth.reddit.com/best.json?sr_detail=true", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: { data: { data: { children: IPostData[] } } }) => {
        console.log({ posts: data.data.children });
        setPostsData(data.data.children);
      })
      .catch(console.error);
  }, []);

  return [postsData];
};
