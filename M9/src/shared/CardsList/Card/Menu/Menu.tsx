import styles from "./menu.css";
import { Dropdown } from "../../../components/UI/Dropdown";
import { MenuItemsList } from "./MenuItemsList";
import { Icon } from "../../../components/UI/Icon";
import { Text } from "../../../components/UI/Text";

interface IMenuProps {
  postId: string;
}

export function Menu({ postId }: IMenuProps) {
  return (
    <div className={styles.menu}>
      <Dropdown
        button={({ setButtonRef, onClick }) => (
          <button
            className={styles.menuButton}
            onClick={onClick}
            ref={setButtonRef}
          >
            <Icon name="Menu" size={20} color="greyD9" />
          </button>
        )}
      >
        <div className={styles.dropdown}>
          <MenuItemsList postId={postId} />
          <Text As="div" className={styles.closeButton} color="grey66">
            Закрыть
          </Text>
        </div>
      </Dropdown>
    </div>
  );
}
