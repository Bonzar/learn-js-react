import styles from "./card.css";
import { CardPreview } from "./CardPreview";
import { Menu } from "./Menu";
import { Controls } from "./Controls";

interface ICardProps {
  postId: string;
  title: string;
  authorUsername: string;
  createdAtUTC: number;
  commentsCount: number;
  upVotesCount: number;
  postUrl: string;
  authorAvatarSrc?: string;
  previewSrc?: string;
}

export function Card(props: ICardProps) {
  const {
    previewSrc,
    authorAvatarSrc,
    authorUsername,
    createdAtUTC,
    title,
    postId,
    commentsCount,
    upVotesCount,
    postUrl,
  } = props;

  return (
    <div className={styles.card}>
      <CardPreview
        previewSrc={previewSrc}
        authorAvatarSrc={authorAvatarSrc}
        authorUsername={authorUsername}
        createdAtUTC={createdAtUTC}
        title={title}
        postUrl={postUrl}
      />
      <Menu postId={postId} />
      <Controls commentsCount={commentsCount} upVotesCount={upVotesCount} />
    </div>
  );
}
