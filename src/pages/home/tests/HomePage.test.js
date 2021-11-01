import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../HomePage";

describe("HomePage --->", () => {
  it("should render the page", () => {
    const { getByText } = render(<HomePage />);
    const welcomeElement = getByText(/WELCOME TO REACT TESTING LIBRARY DEMO/i);
    expect(welcomeElement).toBeInTheDocument();
  });


  it("should match snapshot", () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment(<HomePage />)).toMatchSnapshot();
  });
});
