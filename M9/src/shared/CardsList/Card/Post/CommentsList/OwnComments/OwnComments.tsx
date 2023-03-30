import React from "react";
import styles from "./owncomments.css";
import { GenericList } from "../../../../../components/UI/GenericList";
import { CommentItem, ICommentItemProps } from "../CommentItem";

interface IOwnCommentsProps {
  comments: ICommentItemProps[];
}

export function OwnComments({ comments }: IOwnCommentsProps) {
  return (
    <>
      {
        <GenericList
          list={comments.map((item) => {
            return {
              children: <CommentItem {...item} />,
              As: "li" as const,
              id: item.commentId,
            };
          })}
        />
      }
    </>
  );
}
