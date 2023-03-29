import { createContext, useContext } from "react";

interface ICommentContext {
  comment: string;

  setComment: (comment: string) => void;
}

const commentContext = createContext<ICommentContext | null>(null);

export const CommentProvider = commentContext.Provider;

export const useCommentContext = () => {
  const comment = useContext(commentContext);

  if (!comment) {
    throw new Error(
      "Can't use `useCommentContext` outside of `CommentProvider`"
    );
  }

  return comment;
};
