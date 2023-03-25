import React from "react";
import styles from "./authordatalabel.css";
import { Icon } from "../../../../components/UI/Icon";
import { Text } from "../../../../components/UI/Text";

interface IAuthorDataLabelProps {
  avatarSrc?: string;
  username: string;
}

export function AuthorDataLabel({
  avatarSrc,
  username,
}: IAuthorDataLabelProps) {
  return (
    <div className={styles.userLink}>
      {avatarSrc ? (
        <img className={styles.avatar} src={avatarSrc} alt="avatar" />
      ) : (
        <Icon name="Avatar" className={styles.avatar} color="greyD9" />
      )}
      <a
        href={`https://www.reddit.com/user/${username}`}
        className={styles.username}
      >
        <Text color="orange">{username}</Text>
      </a>
    </div>
  );
}
