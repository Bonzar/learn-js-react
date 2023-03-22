import styles from "./cardpreview.css";
import { Text } from "../../../components/UI/Text";
import { Icon } from "../../../components/UI/Icon";
import { formatDistanceToNow } from "date-fns";
import ruLocale from "date-fns/locale/ru";

interface ICardPreviewProps {
  title: string;
  authorUsername: string;
  createdAtUTC: number;
  authorAvatarSrc?: string;
  previewSrc?: string;
  postUrl: string;
}

export function CardPreview({
  authorAvatarSrc,
  authorUsername,
  createdAtUTC,
  title,
  previewSrc,
  postUrl,
}: ICardPreviewProps) {
  return (
    <div className={styles.cardPreview}>
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          <div className={styles.userLink}>
            {authorAvatarSrc ? (
              <img
                className={styles.avatar}
                src={authorAvatarSrc}
                alt="avatar"
              />
            ) : (
              <Icon className={styles.avatar} name="Avatar" color="greyD9" />
            )}

            <a
              href={`https://www.reddit.com/user/${authorUsername}`}
              className={styles.username}
            >
              <Text color="orange">{authorUsername}</Text>
            </a>
          </div>
          <Text
            className={styles.createdAt}
            size={10}
            tabletSize={14}
            desktopSize={14}
            color="grey99"
          >
            <Text className={styles.publishedLabel} color="grey99">
              опубликовано{" "}
            </Text>
            {formatDistanceToNow(createdAtUTC * 1000, { locale: ruLocale })}{" "}
            назад
          </Text>
        </div>
        <Text
          As="h2"
          size={16}
          desktopSize={20}
          tabletSize={20}
          className={styles.title}
        >
          <a href={postUrl} className={styles.postLink}>
            {title}
          </a>
        </Text>
      </div>
      <div className={styles.preview}>
        {previewSrc ? (
          <img
            className={styles.previewImg}
            src={previewSrc}
            alt="post preview cover"
          />
        ) : (
          <Icon name="RedditLogo" />
        )}
      </div>
    </div>
  );
}
