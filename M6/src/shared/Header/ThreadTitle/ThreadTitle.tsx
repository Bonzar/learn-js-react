import React from "react";
import styles from "./threadtitle.css";
import { Text } from "../../components/UI/Text";

export function ThreadTitle() {
  return (
    <Text As="h1" size={28} className={styles.threadTitle}>
      Header
    </Text>
  );
}
