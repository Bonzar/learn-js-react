export function toCamelCase<T extends string>(str: T) {
  return (str[0].toUpperCase() + str.slice(1).toLowerCase()) as CamelCase<T>;
}

type CamelCase<S extends string> = S extends `${infer P1}${infer P2}`
  ? `${Uppercase<P1>}${Lowercase<P2>}`
  : never;
