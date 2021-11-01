import React from "react";
import Modal from "../Modal";
import { render } from "@testing-library/react";
const somePhrase = "test div for test";
const testedComponent = (
  <Modal isOpen={true} children={<div>{somePhrase}</div>} />
);

describe("Modal component --->", () => {
  it("should render the page", () => {
    const { getByText } = render(testedComponent);
    const childrenInsideModal = getByText(somePhrase);
    expect(childrenInsideModal).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(testedComponent);
    expect(asFragment(testedComponent)).toMatchSnapshot();
  });
});
