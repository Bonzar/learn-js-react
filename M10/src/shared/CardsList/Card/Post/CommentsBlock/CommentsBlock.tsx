import { useEffect, useState } from "react";

import styles from "./commentsblock.css";

import { ICommentItemProps } from "./CommentItem";
import { Text } from "../../../../components/UI/Text";
import { CommentForm } from "./CommentForm";
import { Divider } from "../../../../components/UI/Divider";
import { CommentsList } from "./CommentsList";
import { useCommentsData } from "../../../../../hooks/useCommentsData";

interface ICommentsListProps {
  postId: string;
}

export function CommentsBlock({ postId }: ICommentsListProps) {
  const [comments, setComments] = useState<ICommentItemProps[]>([]);
  const { comments: apiComments, isLoading, error } = useCommentsData(postId);

  useEffect(() => {
    if (apiComments.length > 0) {
      setComments(comments.concat(apiComments));
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
