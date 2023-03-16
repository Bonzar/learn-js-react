import * as icons from "../../../assets/icons";

type TIconNames =
  | "CommentsIcon"
  | "HideIcon"
  | "MenuIcon"
  | "ReportIcon"
  | "SaveIcon"
  | "ShareIcon";

interface IIconProps {
  size?: number;
  name: TIconNames;
}

export function Icon({ name, size }: IIconProps) {
  const IconSVG = icons[name];

  return <IconSVG width={size} height={size} />;
}
