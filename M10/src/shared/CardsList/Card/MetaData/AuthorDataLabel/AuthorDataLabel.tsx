import styles from "./authordatalabel.css";
import { Text } from "../../../../components/UI/Text";
import { UserAvatar } from "./UserAvatar";

interface IAuthorDataLabelProps {
  username?: string;
}

export function AuthorDataLabel({ username }: IAuthorDataLabelProps) {
  return (
    <div className={styles.userLink}>
      <UserAvatar username={username} />
      <a
        href={`https://www.reddit.com/user/${username}`}
        className={styles.username}
      >
        <Text color="orange">{username}</Text>
      </a>
    </div>
  );
}
