import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { GenericList } from "../GenericList";

test("render items from list", () => {
  render(
    <GenericList
      list={[
        { children: "default(div) item 1", id: "key-1" },
        { children: "li item 2", id: "key-2", As: "li" },
        { children: "button item 3", id: "key-3", As: "button" },
        { children: "div item 4", id: "key-4", As: "div" },
        { children: "anchor item 5", id: "key-5", As: "a" },
        {
          children: "anchor with link item 6",
          id: "key-6",
          As: "a",
          href: "#",
        },
      ]}
    />
  );

  expect(screen.getByText(/default\(div\) item 1/i)).toBeInTheDocument();

  expect(screen.getByRole("listitem")).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /button item 3/i })
  ).toBeInTheDocument();

  expect(screen.getByText(/div item 4/i)).toBeInTheDocument();

  expect(screen.getByText(/anchor item 5/i)).toBeInTheDocument();
  expect(screen.getByText(/anchor item 5/i)).not.toHaveAttribute("href");

  expect(
    screen.getByRole("link", { name: /anchor with link item 6/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /anchor with link item 6/i })
  ).toHaveAttribute("href");
});

test("execute callback on element click", async () => {
  const onClick = jest.fn();

  render(
    <GenericList
      list={[
        {
          As: "li",
          id: "key-1",
          onClick: onClick,
          children: <p>item with onClick</p>,
        },
      ]}
    />
  );

  await userEvent.dblClick(screen.getByRole("listitem"));

  expect(onClick).toBeCalledTimes(2);
});
