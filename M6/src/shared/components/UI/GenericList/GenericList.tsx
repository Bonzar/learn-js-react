import React from "react";

export interface IItem {
  id: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  As?: "li" | "button" | "div";
}

type IItemAnchor = Omit<IItem, "As"> & { As: "a"; href?: string };

interface IGenericListProps {
  list: Array<IItem | IItemAnchor>;
}

const NOOP = () => {};

export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map((props) => {
        const { As = "div", children, onClick = NOOP, className, id } = props;
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
