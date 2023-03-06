import styles from "./menu.css";
import { Dropdown } from "../../../components/UI/Dropdown";
import { GenericList } from "../../../components/UI/GenericList";
import { assignRandomId } from "../../../../utils/js/assignRandomId";
import { pipe, mergeLeft, mergeRight, intersperse, objOf } from "ramda";
import {
  MenuIcon,
  CommentsIcon,
  ShareIcon,
  HideIcon,
  SaveIcon,
  ReportIcon,
} from "../../../assets/icons";

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

export function Menu() {
  return (
    <div className={styles.menu}>
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>
        }
      >
        <div className={styles.dropdown}>
          <ul className={styles.menuItemsList}>
            <GenericList
              list={actionsListWithDividers.map(
                pipe(mergeLeft({ As: "li" as const }), assignRandomId)
              )}
            />
          </ul>
          <div className={styles.closeButton}>Закрыть</div>
        </div>
      </Dropdown>
    </div>
  );
}
