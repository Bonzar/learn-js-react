import * as icons from "../../../assets/icons";
import { TColors } from "../Text";
import styles from "../Icon/icon.css";

type TIconNames<T> = T extends `${infer iconNames}Icon` ? iconNames : never;

type TIconFileNames = keyof typeof icons;

interface IIcon {
  name: TIconNames<TIconFileNames>;
  size: number;
  className?: string;
  color?: TColors;
}

type IIconPreciseSize = Omit<IIcon, "size"> & { height: number; width: number };

type IIconProps = IIcon | IIconPreciseSize;

export function Icon(props: IIconProps) {
  const IconSVG = icons[`${props.name}Icon`];

  let iconSizes;
  if ("width" in props && "height" in props) {
    iconSizes = {
      width: props.width,
      height: props.height,
    };
  } else {
    iconSizes = {
      width: props.size,
      height: props.size,
    };
  }

  const classes = [props.className, props.color && styles[props.color]]
    .filter(Boolean)
    .join(" ");

  return <IconSVG className={classes} {...iconSizes} />;
}
