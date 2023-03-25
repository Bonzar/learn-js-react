import React from "react";
import styles from "./publishedatlabel.css";
import { Text } from "../../../../components/UI/Text";
import { formatDistanceToNow } from "date-fns";
import ruLocale from "date-fns/locale/ru";

interface IPublishedAtLabelProps {
  createdAtUTC: number;
}

export function PublishedAtLabel({ createdAtUTC }: IPublishedAtLabelProps) {
  const createdAtName = formatDistanceToNow(createdAtUTC * 1000, {
    locale: ruLocale,
    addSuffix: true,
  });

  return (
    <Text
      className={styles.createdAt}
      size={10}
      tabletSize={14}
      desktopSize={14}
      color="grey99"
    >
      <Text className={styles.publishedLabel} color="grey99">
        опубликовано{" "}
      </Text>
      {createdAtName}
    </Text>
  );
}
