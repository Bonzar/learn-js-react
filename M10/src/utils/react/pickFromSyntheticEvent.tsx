import React from "react";

export function pickFromSyntheticEvent<T extends HTMLElement>() {
  return <K extends keyof T>(key: K) =>
    <E extends (elProp: T[K]) => void>(callback: E) =>
    (event: React.SyntheticEvent<T>) =>
      callback(event.currentTarget[key]);
}
