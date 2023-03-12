import React from "react";

export interface IItem {
  id: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  As?: "a" | "li" | "button" | "div";
  href?: string;
}

interface IGenericListProps {
  list: IItem[];
}

export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = "div", children, onClick, className, id, href }) => (
        <As className={className} onClick={onClick} key={id} href={href}>
          {children}
        </As>
      ))}
    </>
  );
}
