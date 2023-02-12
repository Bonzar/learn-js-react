import * as React from "react";
import styles from "./header.less";
import StarWarsNameClass from "./StarWarsNameClass";
import StarWarsNameFunction from "./StarWarsNameFunciton";

export function Header() {
  const fetchApi = (e) => {
    e.preventDefault();
    fetch("/api")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <header>
      <h1 className={styles.example}>
        <StarWarsNameClass />
        <StarWarsNameFunction />
      </h1>
      <a onClick={(e) => fetchApi(e)}>Click to fetch server api message (see on console)</a>
    </header>
  );
}
