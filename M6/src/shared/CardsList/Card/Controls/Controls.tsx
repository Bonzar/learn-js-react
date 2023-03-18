import React from "react";
import styles from "./controls.css";
import { Text } from "../../../components/UI/Text";
import { Icon } from "../../../components/UI/Icon";

export function Controls() {
  return (
    <div className={styles.controls}>
      <div className={styles.karmaCounter}>
        <button className={styles.up}>
          <Icon name="UpVote" color="greyC4" width={19} height={10} />
        </button>
        <Text
          className={styles.karmaValue}
          tabletSize={14}
          size={12}
          color="greyC4"
        >
          234
        </Text>
        <button className={styles.down}>
          <Icon
            name="UpVote"
            className={styles.down}
            color="greyC4"
            width={19}
            height={10}
          />
        </button>
      </div>

      <button className={styles.commentsButton}>
        <Icon name="Comments" size={15} color="greyC4" />
        <Text className={styles.commentsNumber} size={12} color="greyC4">
          234
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
