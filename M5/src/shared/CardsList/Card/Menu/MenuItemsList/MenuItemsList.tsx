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

export function MenuItemsList() {
  return (
    <ul className={styles.menuItemsList}>
      <GenericList
        list={actionsListWithDividers.map(
          pipe(mergeLeft({ As: "li" as const }), assignRandomId)
        )}
      />
    </ul>
  );
}
