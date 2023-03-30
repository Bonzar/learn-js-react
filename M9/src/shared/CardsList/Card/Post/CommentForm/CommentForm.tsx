import React, { useContext } from "react";
import styles from "./commentform.css";
import { preventDefault } from "../../../../../utils/react/preventDefault";
import { Text } from "../../../../components/UI/Text";
import { useCommentContext } from "../../../../../context/commentContext";
import { userDataContext } from "../../../../../context/userContext";
import { generateRandomString } from "../../../../../utils/js/assignRandomId";

interface ICommentFormProps {
  replyId: string;
  onSuccessReply?: (ownComment: {
    commentId: string;
    content: string;
    authorUsername: string;
    createdAtUTC: number;
  }) => void;
}

export function CommentForm({ replyId, onSuccessReply }: ICommentFormProps) {
  const { comment, setComment } = useCommentContext();
  const { username } = useContext(userDataContext);

  if (!username) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
  };

  const handleSubmit = () => {
    const newOwnComment = comment.trim();

    if (!newOwnComment) return;

    console.log(`Replied to ${replyId} with ${newOwnComment}`);
    onSuccessReply?.({
      commentId: generateRandomString(),
      content: newOwnComment,
      authorUsername: username,
      createdAtUTC: Date.now() / 1000,
    });
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
          <Text size={16} className={styles.commentInputPlaceholderUsername}>
            {username}
          </Text>
          , оставьте ваш комментарий
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
