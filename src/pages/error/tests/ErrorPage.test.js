import React from "react";
import { render } from "@testing-library/react";
import ErrorPage from "../ErrorPage";

describe("ErrorPage --->", () => {
  it("should render the page", () => {
    const { getByText } = render(<ErrorPage />);
    const errorElement = getByText(/404 ERROR/i);
    expect(errorElement).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<ErrorPage />);
    expect(asFragment(<ErrorPage />)).toMatchSnapshot();
  });
});
