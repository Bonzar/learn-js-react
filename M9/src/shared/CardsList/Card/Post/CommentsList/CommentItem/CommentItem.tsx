import React, { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./commentitem.css";
import { Icon } from "../../../../../components/UI/Icon";
import { Divider } from "../../../../../components/UI/Divider";
import { Text } from "../../../../../components/UI/Text";
import { MetaData } from "../../../MetaData";
import { AuthorDataLabel } from "../../../MetaData/AuthorDataLabel";
import { PublishedAtLabel } from "../../../MetaData/PublishedAtLabel";
import { tokenContext } from "../../../../../../context/tokenContext";
import axios from "axios";
import { decodeRedditImageUrl } from "../../../../../../utils/js/decodeRedditImageUrl";

interface ICommentItemProps {
  authorUsername: string;
  content: string;
  createdAtUTC: number;
  children?: ReactNode;
}

export function CommentItem({
  children,
  authorUsername,
  content,
  createdAtUTC,
}: ICommentItemProps) {
  const [authorAvatarSrc, setAuthorAvatarSrc] = useState("");
  const token = useContext(tokenContext);

  useEffect(() => {
    if (authorUsername !== "[deleted]") {
      axios
        .get(`https://oauth.reddit.com/user/${authorUsername}/about.json`, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then(({ data }: { data: { data: { icon_img: string } } }) => {
          setAuthorAvatarSrc(decodeRedditImageUrl(data.data.icon_img));
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className={styles.commentBlock}>
      <div className={styles.indent}>
        <Icon
          name="UpVote"
          className={styles.upVote}
          color="greyD9"
          height={10}
        />
        <Icon
          name="DownVote"
          className={styles.downVote}
          color="greyD9"
          height={10}
        />
        <Divider direction="column" color="greyD9" thickness={3} />
      </div>
      <div className={styles.comment}>
        <MetaData>
          <PublishedAtLabel
            createdAtUTC={createdAtUTC}
            withPublishedLabel={false}
          />
          <AuthorDataLabel
            username={authorUsername}
            avatarSrc={authorAvatarSrc}
          />
        </MetaData>
        <Text As="p" className={styles.content}>
          {content}
        </Text>
        <div className={styles.actions}>
          <button className={styles.actionBtn}>
            <Icon name="Comments" color="grey99" size={16} />
            <Text
              className={[styles.actionText, styles.actionReplyText].join(" ")}
              color="grey99"
            >
              Ответить
            </Text>
          </button>
          <button className={styles.actionBtn}>
            <Icon name="Share" color="grey99" size={15} />
            <Text className={styles.actionText} color="grey99">
              Поделиться
            </Text>
          </button>
          <button className={styles.actionBtn}>
            <Icon name="Report" color="grey99" size={16} />
            <Text className={styles.actionText} color="grey99">
              Пожаловаться
            </Text>
          </button>
        </div>
        {children && <ul>{children}</ul>}
      </div>
    </div>
  );
}
