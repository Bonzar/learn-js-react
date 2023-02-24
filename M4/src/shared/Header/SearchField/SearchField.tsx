import React from "react";
import styles from "./searchfield.css";

export function SearchField() {
  return (
    <div className={styles.searchField}>
      <svg
        className={styles.searchIcon}
        width="11"
        height="11"
        viewBox="0 0 11 11"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.86164 6.91824H7.36478L7.18868 6.74843C7.80503 6.03145 8.1761 5.10063 8.1761 4.08805C8.1761 1.83019 6.34591 0 4.08805 0C1.83019 0 0 1.83019 0 4.08805C0 6.34591 1.83019 8.1761 4.08805 8.1761C5.10063 8.1761 6.03145 7.80503 6.74843 7.18868L6.91824 7.36478V7.86164L10.0629 11L11 10.0629L7.86164 6.91824V6.91824ZM4.08805 6.91824C2.52201 6.91824 1.25786 5.65409 1.25786 4.08805C1.25786 2.52201 2.52201 1.25786 4.08805 1.25786C5.65409 1.25786 6.91824 2.52201 6.91824 4.08805C6.91824 5.65409 5.65409 6.91824 4.08805 6.91824Z" />
      </svg>
      <p className={styles.searchInput}>
        <input
          type="text"
          name="search-query"
          placeholder="Поиск"
        ></input>
      </p>
    </div>
  );
}
