import React from "react";
import styles from "./menuitemslist.css";
import { GenericList } from "../../../../components/UI/GenericList";
import { intersperse, mergeLeft, pipe } from "ramda";
import { assignRandomId } from "../../../../../utils/js/assignRandomId";
import { Icon } from "../../../../components/UI/Icon";
import { Text } from "../../../../components/UI/Text";

const actionsList = [
  {
    children: (
      <>
        <Icon name="Comments" size={16} />
        <Text color="grey99">Комментарии</Text>
      </>
    ),
    className: [styles.menuItem, styles.mobileHideItem].join(" "),
  },
  {
    children: (
      <>
        <Icon name="Share" size={15} />
        <Text color="grey99">Поделиться</Text>
      </>
    ),
    className: [styles.menuItem, styles.mobileHideItem].join(" "),
  },
  {
    children: (
      <>
        <Icon name="Hide" size={14} />
        <Text color="grey99">Скрыть</Text>
      </>
    ),
    className: styles.menuItem,
  },
  {
    children: (
      <>
        <Icon name="Save" size={14} />
        <Text color="grey99">Сохранить</Text>
      </>
    ),
    className: [styles.menuItem, styles.mobileHideItem].join(" "),
  },
  {
    children: (
      <>
        <Icon name="Report" size={16} />
        <Text color="grey99">Пожаловаться</Text>
      </>
    ),
    className: styles.menuItem,
  },
];

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
