import React from "react";
import styles from "./userblock.css";
import { Icon } from "../../../components/UI/Icon";
import { Text } from "../../../components/UI/Text";

interface IUserBlockProp {
  avatarSrc?: string;
  username?: string;
}

export function UserBlock({ avatarSrc, username }: IUserBlockProp) {
  return (
    <a
      className={styles.userBox}
      href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read,submit,identity`}
    >
      <div className={styles.avatarBox}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="profile avatar"
            className={styles.avatarImage}
          />
        ) : (
          <Icon name="Avatar" color="greyD9" />
        )}
      </div>

      <div className={styles.username}>
        <Text size={20} color={username ? "black" : "grey99"}>
          {username ?? "Аноним"}
        </Text>
      </div>
    </a>
  );
}
