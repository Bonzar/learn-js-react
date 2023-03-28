export function stopPropagation<E extends React.SyntheticEvent>(
  eventCallback: (event: E) => void
) {
  return (event: E) => {
    event.stopPropagation();
    eventCallback(event);
  };
}
