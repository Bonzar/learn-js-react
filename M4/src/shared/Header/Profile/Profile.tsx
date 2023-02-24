import React from "react";
import styles from "./profile.css";

interface IProfileProps {
  name: string;
}

export function Profile({ name }: IProfileProps) {
  return (
    <div className={styles.profile}>
      <img width='30rem' className={styles.profileAvatar} src="https://autozone-auto-parts.com/wp-content/uploads/2022/07/Kenneth-M.-700x700.png" alt="User avatar" />
      <p className={styles.profileUsername}>{name}</p>
    </div>
  );
}
