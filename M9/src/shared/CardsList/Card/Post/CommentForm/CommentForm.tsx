import React from "react";
import styles from "./commentform.css";
import { preventDefault } from "../../../../../utils/react/preventDefault";
import { Text } from "../../../../components/UI/Text";
import { toCamelCase } from "../../../../../utils/js/toCamelCase";
import { usePostCommentContext } from "../../../../../context/postCommentContext";

interface ICommentFormProps {
  username: string;
}

export function CommentForm({ username }: ICommentFormProps) {
  const { comment, setComment } = usePostCommentContext();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    console.log(event.target);
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
        placeholder={`${toCamelCase(username)}, оставьте ваш комментарий`}
      />
      <fieldset className={styles.commentActions}></fieldset>
      <button className={styles.submit} type="submit">
        <Text bold color="white">
          Комментировать
        </Text>
      </button>
    </form>
  );
}
