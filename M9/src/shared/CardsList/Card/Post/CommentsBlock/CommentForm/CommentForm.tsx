import React, { useContext, useEffect, useRef } from "react";
import { userDataContext } from "../../../../../../context/userContext";
import { useCommentContext } from "../../../../../../context/commentContext";

import styles from "./commentform.css";

import { Text } from "../../../../../components/UI/Text";

import { generateRandomString } from "../../../../../../utils/js/assignRandomId";
import { preventDefault } from "../../../../../../utils/react/preventDefault";

interface ICommentFormProps {
  replyId: string;
  onSuccessReply?: (ownComment: {
    commentId: string;
    content: string;
    authorUsername: string;
    createdAtUTC: number;
  }) => void;
  mountWithFocus?: boolean;
}

export function CommentForm({
  replyId,
  onSuccessReply,
  mountWithFocus = false,
}: ICommentFormProps) {
  const { comment, setComment } = useCommentContext();
  const { username } = useContext(userDataContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!username) {
    return null;
  }

  useEffect(() => {
    if (!mountWithFocus) {
      return;
    }

    if (!textAreaRef.current) {
      return;
    }

    const initialValueLength = textAreaRef.current.value.length;
    textAreaRef.current.setSelectionRange(
      initialValueLength,
      initialValueLength
    );

    textAreaRef.current.focus();
  }, []);

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
        ref={textAreaRef}
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

interface ICommentFormUncontrolledProps {
  replyId: string;
  onSuccessReply?: (ownComment: {
    commentId: string;
    content: string;
    authorUsername: string;
    createdAtUTC: number;
  }) => void;
  initialValue?: string;
  mountWithFocus?: boolean;
}

export function CommentFormUncontrolled({
  replyId,
  onSuccessReply,
  initialValue,
  mountWithFocus = false,
}: ICommentFormUncontrolledProps) {
  const { username } = useContext(userDataContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!username) {
    return null;
  }

  useEffect(() => {
    if (!mountWithFocus) {
      return;
    }

    if (!textAreaRef.current) {
      return;
    }

    const initialValueLength = textAreaRef.current.value.length;
    textAreaRef.current.setSelectionRange(
      initialValueLength,
      initialValueLength
    );

    textAreaRef.current.focus();
  }, []);

  const handleSubmit = () => {
    const newOwnComment = textAreaRef.current?.value;
    if (!newOwnComment) return;

    const newOwnCommentTrimmed = newOwnComment?.trim();
    if (!newOwnCommentTrimmed) return;

    console.log(`Replied to ${replyId} with ${newOwnComment}`);
    onSuccessReply?.({
      commentId: generateRandomString(),
      content: newOwnCommentTrimmed,
      authorUsername: username,
      createdAtUTC: Date.now() / 1000,
    });
    textAreaRef.current.value = "";
  };

  return (
    <form
      className={styles.commentForm}
      onSubmit={preventDefault(handleSubmit)}
    >
      <textarea
        className={styles.commentInput}
        ref={textAreaRef}
        placeholder={`${username}, оставьте ваш комментарий`}
        defaultValue={initialValue}
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
