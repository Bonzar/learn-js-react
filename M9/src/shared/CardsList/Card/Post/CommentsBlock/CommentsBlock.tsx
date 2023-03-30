import React, { useEffect, useState } from "react";
import { useToken } from "../../../../../hooks/useToken";

// import styles from "./commentsblock.css";

import { ICommentItemProps } from "./CommentItem";
import { Text } from "../../../../components/UI/Text";
import { CommentForm } from "./CommentForm";
import { Divider } from "../../../../components/UI/Divider";
import { CommentsList } from "./CommentsList";

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

export function CommentsBlock({ postId }: ICommentsListProps) {
  const token = useToken();
  const [comments, setComments] = useState<ICommentItemProps[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    setStatus("loading");
    axios
      .get(`https://oauth.reddit.com/comments/${postId}.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: IPostComments) => {
        setComments(unpackComments(data[1].data.children));
        setStatus("ready");
      })
      .catch((error) => {
        setStatus("error");
        console.error(error);
      });
  }, []);

  const unpackComments = (comments: TComment[]): ICommentItemProps[] => {
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
        replies: replies && unpackComments(replies.data.children),
      };
    });
  };

  return (
    <>
      <CommentForm
        replyId={postId}
        onSuccessReply={(item) => {
          setStatus("ready");
          setComments([item].concat(comments));
        }}
      />

      <Divider color="greyD9" />

      {status === "loading" && <Text>Загрузка комментариев ... </Text>}
      {status === "error" && <Text>Ошибка загрузки комментариев 🫣</Text>}
      {status === "ready" && comments.length === 0 && (
        <Text>Здесь пока пусто 🫣</Text>
      )}

      {status === "ready" && comments.length > 0 && (
        <CommentsList comments={comments} />
      )}
    </>
  );
}
