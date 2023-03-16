import styles from "./text.css";
import { ReactNode } from "react";

type TTextSizes = 28 | 20 | 16 | 14 | 12 | 10;

type TColors =
  | "black"
  | "orange"
  | "green"
  | "white"
  | "greyF4"
  | "greyF3"
  | "greyEC"
  | "greyD9"
  | "greyC4"
  | "grey99"
  | "grey66";

interface ITextProps {
  As?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  children?: ReactNode;
  size?: TTextSizes;
  mobileSize?: TTextSizes;
  tabletSize?: TTextSizes;
  desktopSize?: TTextSizes;
  color?: TColors;
  bold?: boolean;
  className?: string;
}

export function Text(props: ITextProps) {
  const {
    As = "span",
    children,
    size = 14,
    desktopSize,
    mobileSize,
    tabletSize,
    color = "black",
    bold = false,
    className,
  } = props;

  const classes = [
    className,
    styles[`s${size}`],
    mobileSize && styles[`m${mobileSize}`],
    tabletSize && styles[`t${tabletSize}`],
    desktopSize && styles[`d${desktopSize}`],
    styles[color],
    bold && styles.bold,
  ]
    .filter(Boolean)
    .join(" ");

  return <As className={classes}>{children}</As>;
}
