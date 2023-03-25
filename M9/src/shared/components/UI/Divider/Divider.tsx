import React from "react";
import styles from "./divider.css";
import { TColors } from "../Text";

interface IDividerProps {
  color?: TColors;
  thickness?: 1 | 2 | 4;
  direction?: "row" | "column";
}

export function Divider({
  color = "black",
  thickness = 1,
  direction = "row",
}: IDividerProps) {
  return (
    <hr
      className={[
        styles[direction],
        styles[color],
        styles[`th${thickness}`],
      ].join(" ")}
    ></hr>
  );
}
