import { createContext, useContext } from "react";

interface IPostCommentContext {
  comment: string;
  setComment: (comment: string) => void;
}

const postCommentContext = createContext<IPostCommentContext | null>(null);

export const PostCommentProvider = postCommentContext.Provider;

export const usePostCommentContext = () => {
  const postComment = useContext(postCommentContext);

  if (!postComment) {
    throw new Error(
      "Can't use `usePostCommentContext` outside of `PostCommentProvider`"
    );
  }

  return postComment;
};
