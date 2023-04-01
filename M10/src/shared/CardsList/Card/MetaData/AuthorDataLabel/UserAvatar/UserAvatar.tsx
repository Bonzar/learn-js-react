import React from "react";
import styles from "./useravatar.css";
import { useUserAvatar } from "../../../../../../hooks/useUserAvatar";
import { Icon } from "../../../../../components/UI/Icon";

interface IUserAvatarProps {
  username?: string;
}

export function UserAvatar({ username }: IUserAvatarProps) {
  const defaultAvatar = (
    <Icon name="Avatar" className={styles.avatar} color="greyD9" />
  );

  if (!username) {
    return defaultAvatar;
  }

  const { avatarSrc, isLoading, error } = useUserAvatar(username);

  if (isLoading || error || !avatarSrc) {
    return defaultAvatar;
  }

  return <img className={styles.avatar} src={avatarSrc} alt="avatar" />;
}
