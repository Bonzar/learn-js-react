import { useState } from "react";
import styles from "./card.css";
import { Menu } from "./Menu";
import { Controls } from "./Controls";
import { Post } from "./Post";
import { CardPreview } from "./CardPreview";
import { Modal } from "../../components/UI/Modal";
import { CommentProvider } from "../../../context/commentContext";

interface ICardProps {
  postId: string;
  title: string;
  content: string;
  authorUsername: string;
  createdAtUTC: number;
  commentsCount: number;
  upVotesCount: number;
  previewSrc?: string;
}

export function Card(props: ICardProps) {
  const {
    previewSrc,
    authorUsername,
    createdAtUTC,
    title,
    content,
    postId,
    commentsCount,
    upVotesCount,
  } = props;

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpenPost = () => {
    setIsPostOpen(true);
  };

  const handleClosePost = () => {
    setIsPostOpen(false);
  };

  return (
    <CommentProvider value={{ comment, setComment }}>
      <div className={styles.card}>
        <CardPreview
          authorUsername={authorUsername}
          createdAtUTC={createdAtUTC}
          title={title}
          onPostLinkClick={handleOpenPost}
          previewSrc={previewSrc}
        />
        <Menu postId={postId} />
        <Controls commentsCount={commentsCount} upVotesCount={upVotesCount} />

        {isPostOpen && (
          <Modal onOutsideClick={handleClosePost}>
            <Post
              postId={postId}
              title={title}
              content={content}
              upVotesCount={upVotesCount}
              authorUsername={authorUsername}
              createdAtUTC={createdAtUTC}
              previewSrc={previewSrc}
              onCloseClick={handleClosePost}
            />
          </Modal>
        )}
      </div>
    </CommentProvider>
  );
}
