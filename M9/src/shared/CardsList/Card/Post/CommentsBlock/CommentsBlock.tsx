import { useEffect, useState } from "react";

import styles from "./commentsblock.css";

import { ICommentItemProps } from "./CommentItem";
import { Text } from "../../../../components/UI/Text";
import { CommentForm } from "./CommentForm";
import { Divider } from "../../../../components/UI/Divider";
import { CommentsList } from "./CommentsList";
import {
  useCommentsData,
  TComment,
  ICommentData,
} from "../../../../../hooks/useCommentsData";

interface ICommentsListProps {
  postId: string;
}

interface IUnpackedComments {
  commentId: string;
  authorUsername: string;
  content: string;
  createdAtUTC: number;
  replies?: IUnpackedComments[];
}

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

export function CommentsBlock({ postId }: ICommentsListProps) {
  const [comments, setComments] = useState<ICommentItemProps[]>([]);
  const { comments: apiComments, isLoading, error } = useCommentsData(postId);

  useEffect(() => {
    if (apiComments.length > 0) {
      setComments(comments.concat(unpackComments(apiComments)));
    }
  }, [apiComments]);

  return (
    <>
      <CommentForm
        replyId={postId}
        onSuccessReply={(item) => {
          setComments([item].concat(comments));
        }}
      />

      <Divider color="greyD9" />

      {comments.length > 0 && (
        <div className={styles.commentsBlock}>
          <CommentsList comments={comments} />
        </div>
      )}
      {!isLoading && !error && comments.length === 0 && (
        <Text>Здесь пока пусто 🫣</Text>
      )}
      {isLoading && <Text>Загрузка комментариев ... </Text>}
      {error && <Text>Ошибка загрузки комментариев 🫣</Text>}
    </>
  );
}