import * as React from "react";

export function Header() {
  const fetchApi = (e) => {
    e.preventDefault();
    fetch("/api")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  // noinspection JSVoidFunctionReturnValueUsed,JSValidateTypes
  return (
    <header>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1>asdf asdf asdf </h1>
      <a onClick={(e) => fetchApi(e)}>Click me </a>
    </header>
  );
}
