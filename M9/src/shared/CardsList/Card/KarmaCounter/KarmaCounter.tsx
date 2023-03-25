import styles from "./karmacounter.css";
import { Icon } from "../../../components/UI/Icon";
import { Text } from "../../../components/UI/Text";

interface IKarmaCounterProps {
  upVotesCount: number;
  isMobileVerticalAlign?: boolean;
}

export function KarmaCounter({
  upVotesCount,
  isMobileVerticalAlign,
}: IKarmaCounterProps) {
  return (
    <div
      className={[
        styles.karmaCounter,
        isMobileVerticalAlign && styles.mobileVerticalAlign,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button className={styles.up}>
        <Icon name="UpVote" color="greyC4" width={19} height={10} />
      </button>
      <Text
        className={styles.karmaValue}
        tabletSize={14}
        size={12}
        color="greyC4"
      >
        {upVotesCount}
      </Text>
      <button>
        <Icon
          name="UpVote"
          className={styles.down}
          color="greyC4"
          width={19}
          height={10}
        />
      </button>
    </div>
  );
}
