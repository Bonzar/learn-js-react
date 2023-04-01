import React from "react";
import styles from "./commentslist.css";

import { GenericList } from "../../../../../components/UI/GenericList";
import { CommentItem, ICommentItemProps } from "../CommentItem";

interface ICommentsListProps {
  comments: ICommentItemProps[];
}

export function CommentsList({ comments }: ICommentsListProps) {
  return (
    <ul className={styles.commentsList}>
      <GenericList
        list={comments.map((item) => {
          return {
            children: <CommentItem {...item} />,
            As: "li" as const,
            id: item.commentId,
          };
        })}
      />
    </ul>
  );
}
