import { createContext, ReactNode } from "react";
import { usePostsData } from "../hooks/usePostsData";

interface IPostData {
  data: {
    author: string;
    created: number;
    title: string;
    thumbnail: string;
    id: string;
    ups: number;
    num_comments: number;
    sr_detail: {
      icon_img: string;
    };
    url: string;
  };
}

type IPostsDataContext = IPostData[];

export const postsDataContext = createContext<IPostsDataContext>([]);

export function PostsDataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [postsData] = usePostsData();

  return (
    <postsDataContext.Provider value={postsData}>
      {children}
    </postsDataContext.Provider>
  );
}
