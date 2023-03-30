import { ReactNode } from "react";
import styles from "./metadata.css";

interface IMetaDataProps {
  children: ReactNode;
  isDesktopReverse?: boolean;
  isTabletReverse?: boolean;
}

export function MetaData({
  children,
  isDesktopReverse,
  isTabletReverse,
}: IMetaDataProps) {
  return (
    <div
      className={[
        styles.metaData,
        isDesktopReverse && styles["d-reverse"],
        isTabletReverse && styles["t-reverse"],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
