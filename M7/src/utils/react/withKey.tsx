import React from "react";

export function withKey(key?: string) {
  return <T extends React.ComponentType<any>>(component: T) =>
    <E extends React.ComponentProps<T>>(
      props: E,
      index: number
    ): React.ReactElement<E> =>
      React.createElement(component, {
        ...props,
        key: key ? props[key as keyof E] : index,
      });
}
