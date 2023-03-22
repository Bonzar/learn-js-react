import React from "react";

interface IItemBasic {
  id: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  As?: "li" | "button" | "div";
}

type IItemAnchor = Omit<IItemBasic, "As"> & { As: "a"; href?: string };

export type IGenericListItem = IItemBasic | IItemAnchor;

interface IGenericListProps {
  list: Array<IGenericListItem>;
}
export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map((props) => {
        const { As = "div", children, onClick, className, id } = props;
        return (
          <As
            className={className}
            onClick={onClick}
            key={id}
            href={props.As === "a" ? props.href : undefined}
          >
            {children}
          </As>
        );
      })}
    </>
  );
}
