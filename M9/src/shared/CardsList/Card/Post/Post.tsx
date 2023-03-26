import { useContext } from "react";
import styles from "./post.css";
import { Text } from "../../../components/UI/Text";
import { KarmaCounter } from "../KarmaCounter";
import { Divider } from "../../../components/UI/Divider";
import { PublishedAtLabel } from "../MetaData/PublishedAtLabel";
import { AuthorDataLabel } from "../MetaData/AuthorDataLabel";
import { MetaData } from "../MetaData";
import { CommentForm } from "./CommentForm";
import { CommentsList } from "./CommentsList";
import { userDataContext } from "../../../../context/userContext";

interface IPostProps {
  title: string;
  content: string;
  postId: string;
  upVotesCount: number;
  authorUsername: string;
  createdAtUTC: number;
  previewSrc?: string;
  authorAvatarSrc?: string;
}

export function Post(props: IPostProps) {
  const {
    title,
    postId,
    content,
    upVotesCount,
    authorAvatarSrc,
    authorUsername,
    createdAtUTC,
    previewSrc,
  } = props;

  const { username: loggedUsername } = useContext(userDataContext);

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

      {loggedUsername && (
        <>
          <CommentForm username={loggedUsername} />
          <Divider color="greyD9" />
          <CommentsList postId={postId} />
        </>
      )}
    </article>
  );
}
