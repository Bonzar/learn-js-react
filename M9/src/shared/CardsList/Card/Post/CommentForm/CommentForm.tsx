import React, { useContext } from "react";
import styles from "./commentform.css";
import { preventDefault } from "../../../../../utils/react/preventDefault";
import { Text } from "../../../../components/UI/Text";
import { toCamelCase } from "../../../../../utils/js/toCamelCase";
import { usePostCommentContext } from "../../../../../context/postCommentContext";
import { userDataContext } from "../../../../../context/userContext";

interface ICommentFormProps {
  replyId: string;
}

export function CommentForm({ replyId }: ICommentFormProps) {
  const { comment, setComment } = usePostCommentContext();
  const { username } = useContext(userDataContext);

  if (!username) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
  };

  const handleSubmit = () => {
    console.log(`Replied to ${replyId} with ${comment}`);
    setComment("");
  };

  return (
    <form
      className={styles.commentForm}
      onSubmit={preventDefault(handleSubmit)}
    >
      <textarea
        className={styles.commentInput}
        value={comment}
        onChange={handleChange}
      />
      {!comment && (
        <Text className={styles.commentInputPlaceholder} size={16}>
          {`${toCamelCase(username)}`}
          <Text size={16}>, оставьте ваш комментарий</Text>
        </Text>
      )}

      <fieldset className={styles.commentActions}></fieldset>
      <button className={styles.submit} type="submit">
        <Text bold color="white">
          Комментировать
        </Text>
      </button>
    </form>
  );
}
