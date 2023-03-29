export function getCoords(elem: HTMLElement) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.scrollY,
    right: box.right + window.scrollX,
    bottom: box.bottom + window.scrollY,
    left: box.left + window.scrollX,
    x: box.x + window.scrollX,
    y: box.y + window.scrollY,
    width: box.width,
    height: box.height,
  };
}
