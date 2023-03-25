import styles from "./post.css";
import { Text } from "../../../components/UI/Text";
import { KarmaCounter } from "../KarmaCounter";
import { Divider } from "../../../components/UI/Divider";
import { PublishedAtLabel } from "../MetaData/PublishedAtLabel";
import { AuthorDataLabel } from "../MetaData/AuthorDataLabel";
import { MetaData } from "../MetaData";
import { CommentForm } from "./CommentForm";

interface IPostProps {
  title: string;
  content: string;
  postId: string;
  upVotesCount: number;
  authorUsername: string;
  createdAtUTC: number;
  previewSrc?: string;
  authorAvatarSrc?: string;
  onOutsideClick?: (event: MouseEvent) => void;
}

export function Post(props: IPostProps) {
  const {
    title,
    content,
    upVotesCount,
    authorAvatarSrc,
    authorUsername,
    createdAtUTC,
    previewSrc,
  } = props;

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.textContent}>
          <Text
            As="h2"
            size={16}
            desktopSize={20}
            tabletSize={20}
            className={styles.title}
          >
            {title}
          </Text>
          <MetaData>
            <AuthorDataLabel
              username={authorUsername}
              avatarSrc={authorAvatarSrc}
            />
            <PublishedAtLabel createdAtUTC={createdAtUTC} />
          </MetaData>
        </div>
        <KarmaCounter
          upVotesCount={upVotesCount}
          isMobileVerticalAlign={true}
        />
      </header>

      {content && (
        <Text className={styles.content} As="p" size={14}>
          {content}
        </Text>
      )}

      {previewSrc && (
        <img className={styles.preview} src={previewSrc} alt="Post cover" />
      )}

      {(content || previewSrc) && <Divider color="greyD9" />}

      <CommentForm username={authorUsername} />
    </article>
  );
}
