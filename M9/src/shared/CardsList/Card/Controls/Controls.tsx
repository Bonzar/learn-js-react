import React from "react";
import styles from "./controls.css";
import { Text } from "../../../components/UI/Text";
import { Icon } from "../../../components/UI/Icon";
import { KarmaCounter } from "../KarmaCounter";

interface IControlsProps {
  commentsCount: number;
  upVotesCount: number;
}

export function Controls({ commentsCount, upVotesCount }: IControlsProps) {
  return (
    <div className={styles.controls}>
      <KarmaCounter upVotesCount={upVotesCount} />

      <button className={styles.commentsButton}>
        <Icon name="Comments" size={15} color="greyC4" />
        <Text className={styles.commentsNumber} size={12} color="greyC4">
          {commentsCount}
        </Text>
      </button>
      <div className={styles.actions}>
        <button className={styles.shareButton}>
          <Icon name="ShareDark" size={20} color="greyC4" />
        </button>
        <button className={styles.saveButton}>
          <Icon name="SaveDark" size={20} color="greyC4" />
        </button>
      </div>
    </div>
  );
}
