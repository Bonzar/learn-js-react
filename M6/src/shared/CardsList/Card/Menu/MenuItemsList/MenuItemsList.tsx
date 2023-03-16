import React from "react";
import styles from "./menuitemslist.css";
import { GenericList } from "../../../../components/UI/GenericList";
import { intersperse, mergeLeft, mergeRight, objOf, pipe } from "ramda";
import { assignRandomId } from "../../../../../utils/js/assignRandomId";
import { Icon } from "../../../../components/UI/Icon";
import { Text } from "../../../../components/UI/Text";

const actionsList = [
  <>
    <Icon name="CommentsIcon" size={16} />
    <Text color="grey99">Комментарии</Text>
  </>,
  <>
    <Icon name="ShareIcon" size={15} />
    <Text color="grey99">Поделиться</Text>
  </>,
  <>
    <Icon name="HideIcon" size={14} />
    <Text color="grey99">Скрыть</Text>
  </>,
  <>
    <Icon name="SaveIcon" size={14} />
    <Text color="grey99">Сохранить</Text>
  </>,
  <>
    <Icon name="ReportIcon" size={16} />
    <Text color="grey99">Пожаловаться</Text>
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
