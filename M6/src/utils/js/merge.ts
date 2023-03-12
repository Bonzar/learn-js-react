export function merge<O extends object>(firstObj: O) {
  return <K extends object>(secondObj: K) => ({
    ...firstObj,
    ...secondObj
  })
}