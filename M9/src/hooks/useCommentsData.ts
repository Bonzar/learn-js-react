import { useEffect, useState } from "react";

import { useToken } from "./useToken";
import axios from "axios";

export interface ICommentData {
  data: {
    author: string;
    created_utc: number;
    body: string;
    id: string;
    replies:
      | {
          data: {
            children: TComment[];
          };
        }
      | "";
    ups: number;
    num_comments: number;
  };
  kind: "t1";
}

interface ICommentMore {
  data: { children: string[] };
  kind: "more";
}

export type TComment = ICommentData | ICommentMore;

type TPostComments = [
  Record<string, unknown>,
  {
    data: {
      children: TComment[];
    };
  }
];

export function useCommentsData(postId: string) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const token = useToken();

  useEffect(() => {
    axios
      .get<TPostComments>(`https://oauth.reddit.com/comments/${postId}.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setComments(data[1].data.children);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { comments, isLoading, error };
}
