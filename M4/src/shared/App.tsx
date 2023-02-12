import { hot } from "react-hot-loader/root";
import * as React from "react";
import styles from "./app.css";
import StarWarsNameFunction from "./StarWarsNameFunction";

function HeaderComponent() {
  return (
    <header className={styles.example}>
      <StarWarsNameFunction />
    </header>
  );
}

export const App = hot(HeaderComponent);
