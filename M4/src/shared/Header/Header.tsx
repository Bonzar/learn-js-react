import React from "react";
import styles from "./header.css";
import { SerchBlock } from "./SerchBlock";
import { ThreadTitle } from "./ThreadTitle";
import { SortBlock } from "./SortBlock";

export function Header() {
  return (
    <header className={styles.header}>
      <SerchBlock />
      <ThreadTitle />
      <SortBlock />
    </header>
  );
}
