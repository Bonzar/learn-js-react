import React from "react";
import styles from "./menuitemslist.css";
import { GenericList } from "../../../../components/UI/GenericList";
import { intersperse, mergeLeft, mergeRight, objOf, pipe } from "ramda";
import { assignRandomId } from "../../../../../utils/js/assignRandomId";

import {
  CommentsIcon,
  ShareIcon,
  HideIcon,
  SaveIcon,
  ReportIcon,
} from "../../../../assets/icons";

const actionsList = [
  <>
    <CommentsIcon />
    <span>Комментарии</span>
  </>,
  <>
    <ShareIcon />
    <span>Поделиться</span>
  </>,
  <>
    <HideIcon />
    <span>Скрыть</span>
  </>,
  <>
    <SaveIcon />
    <span>Сохранить</span>
  </>,
  <>
    <ReportIcon />
    <span>Пожаловаться</span>
  </>,
].map(pipe(objOf("children"), mergeRight({ className: styles.menuItem })));

const actionsListWithDividers = intersperse(
  { children: <hr></hr>, className: styles.divider },
  actionsList
);

const actionsListWithDividersAndId =
  actionsListWithDividers.map(assignRandomId);

interface IMenuItemsListProps {
  postId: string;
}

export function MenuItemsList({ postId }: IMenuItemsListProps) {
  return (
    <ul className={styles.menuItemsList}>
      <GenericList
        list={actionsListWithDividersAndId.map(
          pipe(
            mergeLeft({ As: "li" as const, onClick: () => console.log(postId) })
          )
        )}
      />
    </ul>
  );
}
