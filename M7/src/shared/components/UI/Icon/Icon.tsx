import * as icons from "../../../assets/icons";
import { TColors } from "../Text";
import styles from "../Icon/icon.css";

type TIconNames<T> = T extends `${infer iconNames}Icon` ? iconNames : never;

type TIconFileNames = keyof typeof icons;

interface IIconProps {
  name: TIconNames<TIconFileNames>;
  size?: number;
  height?: number;
  width?: number;
  className?: string;
  color?: TColors;
}

export function Icon(props: IIconProps) {
  const IconSVG = icons[`${props.name}Icon`];

  let iconSizes: { width: number | "100%"; height: number | "100%" } = {
    width: "100%",
    height: "100%",
  };

  // override width if it presents
  if ("width" in props && props.width !== undefined) {
    iconSizes.width = props.width;
  }

  // override height if it presents
  if ("height" in props && props.height !== undefined) {
    iconSizes.height = props.height;
  }

  // override height & width if size presents
  if ("size" in props && props.size !== undefined) {
    iconSizes.height = props.size;
    iconSizes.width = props.size;
  }

  const classes = [props.className, props.color && styles[props.color]]
    .filter(Boolean)
    .join(" ");

  return <IconSVG className={classes} {...iconSizes} />;
}
