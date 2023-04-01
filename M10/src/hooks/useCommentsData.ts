import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/slices/tokenSlice";

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

interface IUnpackedComments {
  commentId: string;
  authorUsername: string;
  content: string;
  createdAtUTC: number;
  replies?: IUnpackedComments[];
}

export function useCommentsData(postId: string) {
  const [comments, setComments] = useState<IUnpackedComments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const token = useAppSelector(selectToken);

  const unpackComments = (comments: TComment[]): IUnpackedComments[] => {
    const commentWithoutMore = comments.filter(
      (item): item is ICommentData => item.kind === "t1"
    );
    return commentWithoutMore.map((item) => {
      const {
        data: { author, replies, body, created_utc, id },
      } = item;

      return {
        commentId: id,
        content: body,
        authorUsername: author,
        createdAtUTC: created_utc,
        replies: replies ? unpackComments(replies.data.children) : [],
      };
    });
  };

  useEffect(() => {
    axios
      .get<TPostComments>(`https://oauth.reddit.com/comments/${postId}.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setComments(unpackComments(data[1].data.children));
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { comments, isLoading, error };
}
