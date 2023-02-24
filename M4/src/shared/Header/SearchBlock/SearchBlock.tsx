import React from "react";
import styles from "./searchblock.css";

interface ISearchBlockProps {
  children?: React.ReactNode;
}

export function SearchBlock({ children }: ISearchBlockProps) {
  return <div className={styles.searchBlock}>{children}</div>;
}
