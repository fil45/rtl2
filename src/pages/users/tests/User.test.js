import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import User from "../User";

const deleteFunction = jest.fn();

const user = {
  id: 1,
  firstname: "Alex",
  lastname: "Hodovas",
};

const component = <User user={user} onDelete={deleteFunction} />;

describe("User page --->", () => {
  it("should render the page", () => {
    const { getByText } = render(component);
    const firstname = getByText(/Alex/i);
    expect(firstname).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(component);
    expect(asFragment(component)).toMatchSnapshot();
  });

  it("should delete button works", async () => {
    const { getByRole } = render(component);

    const deleteButton = getByRole("button");
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);

    expect(deleteFunction).toBeCalledWith(1);
    expect(deleteFunction).toBeCalledTimes(1);
  });
});
