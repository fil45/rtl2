import React from "react";
import Navbar from "../Navbar";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const testedComponent = (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
);

describe("Navbar component --->", () => {
  it("should render the page", () => {
    const { getByText, getByAltText } = render(testedComponent);

    const logo = getByAltText("logo");
    expect(logo).toBeInTheDocument();

    const title = getByText(/REACT TESTING LIBRARY DEMO/i);
    expect(title).toBeInTheDocument();

    const linkToUsers = getByText(/Users/i);
    expect(linkToUsers).toBeInTheDocument();

    const linkToRedux = getByText(/Redux/i);
    expect(linkToRedux).toBeInTheDocument();

    const linkToContext = getByText(/Context/i);
    expect(linkToContext).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(testedComponent);
    expect(asFragment(testedComponent)).toMatchSnapshot();
  });
});
