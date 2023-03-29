import { useContext, useEffect, useState } from "react";
import styles from "./card.css";
import axios from "axios";
import { Menu } from "./Menu";
import { Controls } from "./Controls";
import { Post } from "./Post";
import { CardPreview } from "./CardPreview";
import { Modal } from "../../components/UI/Modal";
import { tokenContext } from "../../../context/tokenContext";
import { decodeRedditImageUrl } from "../../../utils/js/decodeRedditImageUrl";
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
  const [authorAvatarSrc, setAuthorAvatarSrc] = useState("");
  const token = useContext(tokenContext);

  const handleOpenPost = () => {
    setIsPostOpen(true);
  };

  const handleClosePost = () => {
    setIsPostOpen(false);
  };

  useEffect(() => {
    axios
      .get(`https://oauth.reddit.com/user/${authorUsername}/about.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: { data: { data: { icon_img: string } } }) => {
        setAuthorAvatarSrc(decodeRedditImageUrl(data.data.icon_img));
      })
      .catch(console.error);
  }, []);

  return (
    <CommentProvider value={{ comment, setComment }}>
      <div className={styles.card}>
        <CardPreview
          authorAvatarSrc={authorAvatarSrc}
          authorUsername={authorUsername}
          createdAtUTC={createdAtUTC}
          title={title}
          onPostLinkClick={handleOpenPost}
          previewSrc={previewSrc}
        />
        <Menu postId={postId} />
        <Controls commentsCount={commentsCount} upVotesCount={upVotesCount} />

        {isPostOpen && ( // Post open in modal throw portal
          <Modal onOutsideClick={handleClosePost}>
            <Post
              postId={postId}
              title={title}
              content={content}
              upVotesCount={upVotesCount}
              authorAvatarSrc={authorAvatarSrc}
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
