import React from "react";
import styles from "./card.css";
import { CardPreview } from "./CardPreview";
import { Menu } from "./Menu";
import { Controls } from "./Controls";

export function Card() {
  return (
    <li className={styles.card}>
      <CardPreview />
      <Menu />
      <Controls />
    </li>
  );
}
