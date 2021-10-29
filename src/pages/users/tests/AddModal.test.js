import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddModal from "../AddModal";

const onOk = jest.fn();
const onCancel = jest.fn();

const user = {
  age: "25",
  firstname: "Alex",
  gender: "Male",
  lastname: "Hodovas",
};

const component = (isOpen) => (
  <AddModal isOpen={isOpen} onCancel={onCancel} onOk={onOk} />
);

describe("AddModal --->", () => {
  it("should not render the modal", () => {
    const { queryByRole } = render(component(false));
    const dialog = queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("should render the modal", () => {
    const { queryByRole, getByTestId } = render(component(true));

    expect(queryByRole("dialog")).toBeInTheDocument();
    expect(queryByRole("heading", { name: "Add User" })).toBeInTheDocument();
    expect(getByTestId("modal_firstname")).toBeInTheDocument();
    expect(getByTestId("modal_lastname")).toBeInTheDocument();
    expect(getByTestId("modal_age")).toBeInTheDocument();
    expect(getByTestId("modal_gender")).toBeInTheDocument();
  });

  it("should call onCancel", () => {
    const { getByRole } = render(component(true));

    const cancelButton = getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(cancelButton);
    expect(onCancel).toBeCalledTimes(1);
  });

  it("should mark required inputs after pressing ok", () => {
    const { getByRole, getByTestId } = render(component(true));

    const okButton = getByRole("button", { name: "OK" });
    expect(okButton).toBeInTheDocument();
    userEvent.click(okButton);
    expect(getByTestId("modal_firstname")).toHaveClass("invalid-input");
    expect(getByTestId("modal_lastname")).toHaveClass("invalid-input");
  });

  it("should call onOk", () => {
    const { getByRole, getByTestId } = render(component(true));

    const okButton = getByRole("button", { name: "OK" });
    const firstName = getByTestId("modal_firstname");
    const lastName = getByTestId("modal_lastname");
    const age = getByTestId("modal_age");
    const gender = getByTestId("modal_gender");

    userEvent.type(firstName, "Alex");
    userEvent.type(lastName, "Hodovas");
    userEvent.type(age, "25");
    userEvent.selectOptions(gender, "Male");

    expect(firstName).toHaveValue("Alex");
    expect(lastName).toHaveValue("Hodovas");
    expect(age).toHaveValue(25);
    expect(gender).toHaveValue("Male");

    userEvent.click(okButton);

    expect(onOk).toBeCalledTimes(1);
    expect(onOk).toBeCalledWith(user);
  });
});
