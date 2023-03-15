import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { Dropdown } from "../Dropdown";

test("render given button without children on component mount", () => {
  render(<Dropdown button={<button />} children={<ul></ul>} />);

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.queryByTestId("dropdown")).toBeInTheDocument();
  expect(screen.queryByTestId("list-container")).not.toBeInTheDocument();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("render empty list on btn click when given empty children", async () => {
  render(<Dropdown button={<button />} children={<></>} />);

  await userEvent.click(screen.getByRole("button"));

  expect(screen.getByTestId("list-container")).toBeInTheDocument();
  expect(screen.getByTestId("list")).toBeInTheDocument();
  expect(screen.getByTestId("list")).toBeEmptyDOMElement();
});

test("open/close children on btn click with callbacks calls", async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();

  render(
    <Dropdown
      button={<button />}
      children={<ul></ul>}
      onOpen={onOpen}
      onClose={onClose}
    />
  );

  // open children
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("list")).toBeInTheDocument();

  // close children
  await userEvent.click(screen.getByRole("button"));
  expect(screen.queryByRole("list")).not.toBeInTheDocument();

  // open children
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("list")).toBeInTheDocument();

  expect(onOpen).toBeCalledTimes(2);
  expect(onClose).toBeCalledTimes(1);
});

test("stop open/close dropdown on btn click when isOpen specified", async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();

  let isOpen = true;

  render(
    <Dropdown
      button={<button />}
      children={<ul></ul>}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    />
  );

  // render with opened children
  expect(screen.getByRole("list")).toBeInTheDocument();

  // should not close children
  await userEvent.click(screen.getByRole("button"));

  expect(screen.getByRole("list")).toBeInTheDocument();

  expect(onOpen).toBeCalledTimes(1);
  expect(onClose).toBeCalledTimes(0);
});

test("add specified className to dropdown when prop exist", () => {
  render(
    <Dropdown
      className="new-class-name-to-be-added"
      button={<button />}
      children={<ul></ul>}
    />
  );

  expect(screen.queryByTestId("dropdown")).toHaveClass(
    "new-class-name-to-be-added"
  );
});
