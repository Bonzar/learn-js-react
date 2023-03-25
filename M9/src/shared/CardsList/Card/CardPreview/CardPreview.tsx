import { MouseEvent } from "react";
import styles from "./cardpreview.css";
import { Text } from "../../../components/UI/Text";
import { Icon } from "../../../components/UI/Icon";
import { MetaData } from "../MetaData";
import { PublishedAtLabel } from "../MetaData/PublishedAtLabel";
import { AuthorDataLabel } from "../MetaData/AuthorDataLabel";

interface ICardPreviewProps {
  title: string;
  authorUsername: string;
  createdAtUTC: number;
  previewSrc?: string;
  onPostLinkClick?: (event: MouseEvent) => void;
  authorAvatarSrc?: string;
}

export function CardPreview({
  authorAvatarSrc,
  authorUsername,
  createdAtUTC,
  title,
  onPostLinkClick,
  previewSrc,
}: ICardPreviewProps) {
  return (
    <>
      <div className={styles.textContent}>
        <MetaData>
          <AuthorDataLabel
            username={authorUsername}
            avatarSrc={authorAvatarSrc}
          />
          <PublishedAtLabel createdAtUTC={createdAtUTC} />
        </MetaData>
        <Text
          As="h2"
          size={16}
          desktopSize={20}
          tabletSize={20}
          className={styles.title}
        >
          <a className={styles.postLink} onClick={onPostLinkClick}>
            {title}
          </a>
        </Text>
      </div>
      <div
        onClick={onPostLinkClick}
        className={[styles.preview, !previewSrc && styles.previewPlaceholder]
          .filter(Boolean)
          .join(" ")}
      >
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
    </>
  );
}
