import { render, screen } from "@testing-library/react";
import ContextPage from "../ContextPage";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import SelectedUsersContextProvider from "SelectedUsersContextProvider";
import { users } from "../../../testHelper";

const component = (
  <SelectedUsersContextProvider>
    <ContextPage />
  </SelectedUsersContextProvider>
);

const mockJson = Promise.resolve(users);
const mockFetch = Promise.resolve({ json: () => mockJson, ok: true });

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => mockFetch);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ContextPage --->", () => {
  it("should renders empty list", async () => {
    render(component);
    await act(() => mockJson);

    const ids = screen.getByTestId("ids-list");
    expect(ids).toBeEmptyDOMElement();
  });

  it("should renders ids list when user selected", async () => {
    render(component);
    await act(() => mockJson);

    const checkboxes = screen.getAllByRole("checkbox");
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    const ids = screen.getByTestId("ids-list");
    expect(ids).toHaveTextContent("1,2");
  });
});
