import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Router from "../Router";
import { createMemoryHistory } from "history";

const renderWithRoute = (component, route = "/") => {
  window.history.pushState({}, "Test page", route);
  return render(component);
};

describe("Router --->", () => {
  it("should render the home page", () => {
    const { getByText } = renderWithRoute(<Router />);
    const welcomeText = getByText(/welcome/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it("should navigate to the users page", () => {
    const { getByRole } = renderWithRoute(<Router />);
    const usersPageLink = getByRole("link", { name: /users/i });
    userEvent.click(usersPageLink);
    const userPageTitle = getByRole("heading", { name: /users/i });
    expect(userPageTitle).toBeInTheDocument();
  });

  it("should navigate to the eror page if route is wrong", () => {
    const history = createMemoryHistory();
    const { getByText, getByRole } = renderWithRoute(
      <Router history={history} />
    );

    const welcomeText = getByText(/welcome/i);
    expect(welcomeText).toBeInTheDocument();

    history.push("wrong-route");

    const errorPageTitle = getByRole("heading", /error/i);
    expect(errorPageTitle).toBeInTheDocument();
  });

  it("should navigate to the home page when user click logo", () => {
    const { getByRole, getByAltText, getByText } = renderWithRoute(
      <Router />,
      "/users"
    );

    const userPageTitle = getByRole("heading", /users/i);
    expect(userPageTitle).toBeInTheDocument();

    const logo = getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();

    userEvent.click(logo);

    const welcomeText = getByText(/welcome/i);
    expect(welcomeText).toBeInTheDocument();
  });
});
