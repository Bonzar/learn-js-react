import * as React from "react";
import { Header } from "./Header";
import { TodoApp } from "./TodoApp";

export function Body() {
  return (
    <div>
      <Header />
      <TodoApp />
    </div>
  );
}

