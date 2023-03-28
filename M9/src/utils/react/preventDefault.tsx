export function preventDefault<E extends React.SyntheticEvent>(
  eventCallback: (event: E) => void
) {
  return (event: E) => {
    event.preventDefault();
    eventCallback(event);
  };
}
