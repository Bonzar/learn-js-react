import React from "react";
import styles from "./header.css";
import { SearchBlock } from "./SearchBlock";
import { SearchField } from "./SearchField";
import { Mail } from "./Mail";
import { Profile } from "./Profile";
import { FilterDropdown } from "./FilterDropdown";
import { ThreadTitle } from "./ThreadTitle";

export function Header() {
  return (
    <header className={styles.header}>
      <SearchBlock>
        <Profile name="Константин" />
        <SearchField />
        <Mail />
      </SearchBlock>
      <ThreadTitle />
      <FilterDropdown />
    </header>
  );
}
