import styles from "./menu.css";
import { Dropdown } from "../../../components/UI/Dropdown";
import { MenuItemsList } from "./MenuItemsList";
import { Icon } from "../../../components/UI/Icon";
import { Text } from "../../../components/UI/Text";

export function Menu() {
  return (
    <div className={styles.menu}>
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <Icon name="MenuIcon" size={20} />
          </button>
        }
      >
        <div className={styles.dropdown}>
          <MenuItemsList postId="1234" />
          <Text As="div" className={styles.closeButton} color="grey66">
            Закрыть
          </Text>
        </div>
      </Dropdown>
    </div>
  );
}
