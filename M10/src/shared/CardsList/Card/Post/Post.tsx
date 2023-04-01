import { useContext, MouseEvent } from "react";
import styles from "./post.css";
import { Text } from "../../../components/UI/Text";
import { KarmaCounter } from "../KarmaCounter";
import { Divider } from "../../../components/UI/Divider";
import { PublishedAtLabel } from "../MetaData/PublishedAtLabel";
import { AuthorDataLabel } from "../MetaData/AuthorDataLabel";
import { MetaData } from "../MetaData";
import { CommentsBlock } from "./CommentsBlock";
import { userDataContext } from "../../../../context/userContext";
import { Icon } from "../../../components/UI/Icon";

interface IPostProps {
  title: string;
  content: string;
  postId: string;
  upVotesCount: number;
  authorUsername: string;
  createdAtUTC: number;
  previewSrc?: string;
  onCloseClick?: (event: MouseEvent) => void;
}

export function Post(props: IPostProps) {
  const {
    title,
    postId,
    content,
    upVotesCount,
    authorUsername,
    createdAtUTC,
    previewSrc,
    onCloseClick,
  } = props;

  const { username: loggedUsername } = useContext(userDataContext);

  return (
    <article className={styles.post}>
      <button className={styles.closeBtn} onClick={onCloseClick}>
        <Icon name="Close" color="greyAD" />
      </button>

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
            <AuthorDataLabel username={authorUsername} />
            <PublishedAtLabel createdAtUTC={createdAtUTC} />
          </MetaData>
        </div>
        <KarmaCounter
          upVotesCount={upVotesCount}
          isMobileVerticalAlign={true}
        />
      </header>

      <div className={styles.content}>
        {content && (
          <Text className={styles.commentText} As="p" size={14}>
            {content}
          </Text>
        )}

        {previewSrc && (
          <img className={styles.preview} src={previewSrc} alt="Post cover" />
        )}

        {(content || previewSrc) && <Divider color="greyD9" />}

        {!loggedUsername && (
          <Text As="div" className={styles.notLoggedInBanner} size={16}>
            <a
              className={styles.notLoggedInLink}
              href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read,submit,identity`}
            >
              Войдите
            </a>
            , чтобы просматривать и оставлять комментарии.
          </Text>
        )}

        {loggedUsername && <CommentsBlock postId={postId} />}
      </div>
    </article>
  );
}
