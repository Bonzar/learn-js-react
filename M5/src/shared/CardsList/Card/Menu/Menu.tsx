import styles from "./menu.css";
import { Dropdown } from "../../../components/UI/Dropdown";
import { MenuIcon } from "../../../assets/icons";
import { MenuItemsList } from "./MenuItemsList";

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
          <MenuItemsList />
          <div className={styles.closeButton}>Закрыть</div>
        </div>
      </Dropdown>
    </div>
  );
}
