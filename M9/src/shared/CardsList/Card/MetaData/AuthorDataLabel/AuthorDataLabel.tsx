import React, { useContext, useEffect, useState } from "react";
import styles from "./authordatalabel.css";
import { Icon } from "../../../../components/UI/Icon";
import { Text } from "../../../../components/UI/Text";
import axios from "axios";
import { decodeRedditImageUrl } from "../../../../../utils/js/decodeRedditImageUrl";
import { tokenContext } from "../../../../../context/tokenContext";

interface IAuthorDataLabelProps {
  username: string;
}

export function AuthorDataLabel({ username }: IAuthorDataLabelProps) {
  const [avatarSrc, setAvatarSrc] = useState("");
  const token = useContext(tokenContext);

  useEffect(() => {
    axios
      .get(`https://oauth.reddit.com/user/${username}/about.json`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }: { data: { data: { icon_img: string } } }) => {
        setAvatarSrc(decodeRedditImageUrl(data.data.icon_img));
      })
      .catch(console.error);
  }, []);

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
