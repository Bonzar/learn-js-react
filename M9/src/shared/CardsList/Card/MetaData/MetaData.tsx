import { ReactNode } from "react";
import styles from "./metadata.css";

interface IMetaDataProps {
  children: ReactNode;
}

export function MetaData({ children }: IMetaDataProps) {
  return <div className={styles.metaData}>{children}</div>;
}
