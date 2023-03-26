import React, { useEffect, useState } from "react";
import styles from "./commentslist.css";
import { useToken } from "../../../../../hooks/useToken";
import { CommentItem } from "./CommentItem";
import { GenericList } from "../../../../components/UI/GenericList";
import axios from "axios";

interface ICommentsListProps {
  postId: string;
}

interface ICommentData {
  data: {
    author: string;
    created_utc: number;
    body: string;
    id: string;
    replies?: {
      data: {
        children: TComment[];
      };
    };
    ups: number;
    num_comments: number;
  };
  kind: "t1";
}

interface ICommentMore {
  data: { children: string[] };
  kind: "more";
}

type TComment = ICommentData | ICommentMore;

interface IPostComments {
  data: [
    Record<string, unknown>,
    {
      data: {
        children: TComment[];
      };
    }
  ];
}

export function CommentsList({ postId }: ICommentsListProps) {
  const token = useToken();
  const [comments, setComments] = useState<TComment[] | null>(null);

  useEffect(() => {
    axios
      .get(`https://oauth.reddit.com/comments/${postId}.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: IPostComments) => {
        console.log({ data });

        setComments(data[1].data.children);
      })
      .catch((error) => console.error(error));
  }, []);

  const unpackComments = (comments: TComment[]) => {
    const commentWithoutMore = comments.filter(
      (item): item is ICommentData => item.kind === "t1"
    );

    return (
      commentWithoutMore.length > 0 && (
        <GenericList
          list={commentWithoutMore.map((item) => ({
            children: (
              <CommentItem
                authorUsername={item.data.author}
                content={item.data.body}
                createdAtUTC={item.data.created_utc}
              >
                {item.data.replies &&
                  unpackComments(item.data.replies.data.children)}
              </CommentItem>
            ),
            As: "li" as const,
            id: item.data.id,
          }))}
        />
      )
    );
  };

  return (
    comments && (
      <ul className={styles.commentsList}>{unpackComments(comments)}</ul>
    )
  );
}
