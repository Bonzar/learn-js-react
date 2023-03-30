import React, { useEffect, useState } from "react";
import styles from "./commentslist.css";
import { useToken } from "../../../../../hooks/useToken";
import { CommentItem, ICommentItemProps } from "./CommentItem";
import { GenericList } from "../../../../components/UI/GenericList";
import axios from "axios";
import { Text } from "../../../../components/UI/Text";
import { CommentForm } from "../CommentForm";
import { Divider } from "../../../../components/UI/Divider";
import { OwnComments } from "./OwnComments";

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
  const [comments, setComments] = useState<TComment[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [ownComments, setOwnComments] = useState<ICommentItemProps[]>([]);

  useEffect(() => {
    setStatus("loading");
    axios
      .get(`https://oauth.reddit.com/comments/${postId}.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: IPostComments) => {
        setComments(data[1].data.children);
        setStatus("ready");
      })
      .catch((error) => {
        setStatus("error");
        console.error(error);
      });
  }, []);

  const unpackComments = (comments: TComment[]) => {
    const commentWithoutMore = comments.filter(
      (item): item is ICommentData => item.kind === "t1"
    );

    return (
      commentWithoutMore.length > 0 && (
        <GenericList
          list={commentWithoutMore.map((item) => {
            const {
              data: { author, replies, body, created_utc, id },
            } = item;

            return {
              children: (
                <CommentItem
                  authorUsername={author}
                  content={body}
                  createdAtUTC={created_utc}
                  commentId={id}
                >
                  {replies && unpackComments(replies.data.children)}
                </CommentItem>
              ),
              As: "li" as const,
              id: id,
            };
          })}
        />
      )
    );
  };

  return (
    <>
      <CommentForm
        replyId={postId}
        onSuccessReply={(item) => {
          setStatus("ready");
          setOwnComments([item].concat(ownComments));
        }}
      />

      <Divider color="greyD9" />

      {status === "loading" && <Text>Загрузка комментариев ... </Text>}
      {status === "error" && <Text>Ошибка загрузки комментариев 🫣</Text>}
      {status === "ready" &&
        comments.length === 0 &&
        ownComments.length === 0 && <Text>Здесь пока пусто 🫣</Text>}

      {status === "ready" &&
        (comments.length > 0 || ownComments.length > 0) && (
          <ul className={styles.commentsList}>
            {ownComments.length > 0 && <OwnComments comments={ownComments} />}
            {comments.length > 0 && unpackComments(comments)}
          </ul>
        )}
    </>
  );
}
