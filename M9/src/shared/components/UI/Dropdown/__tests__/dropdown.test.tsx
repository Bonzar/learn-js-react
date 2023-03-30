import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { Dropdown } from "../Dropdown";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

test("render given button without children on component mount", () => {
  render(<Dropdown button={() => <button />} children={<ul></ul>} />);

  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("render empty list on btn click when given empty children", async () => {
  render(
    <Dropdown
      button={({ onClick }) => <button onClick={onClick} />}
      children={<></>}
    />
  );

  await userEvent.click(screen.getByRole("button"));

  expect(screen.getByTestId("dropdown")).toBeInTheDocument();
});

test("open/close children on btn click with callbacks calls", async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();

  render(
    <Dropdown
      button={({ onClick }) => <button onClick={onClick} />}
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
      button={({ onClick }) => <button onClick={onClick} />}
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
