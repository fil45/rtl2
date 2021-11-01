import React from "react";
import { render, waitForElementToBeRemoved, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsersPage from "../UsersPage";
import { baseUrl } from "../../../const";
import { users } from '../../../testHelper'

const component = () => <UsersPage />;
const mockJson = Promise.resolve(users);
const mockFetch = Promise.resolve({ json: () => mockJson, ok: true });

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => mockFetch);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("UsersPage --->", () => {
  it("should render the page", async () => {
    const { getByText } = render(component());
    const title = getByText(/USERS/i);
    const addButton = getByText(/add/i);
    const loadingText = getByText(/Loading/i);

    expect(title).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();

    await waitForElementToBeRemoved(loadingText);
  });

  it("should make api call on the first render", async () => {
    const { getByText } = render(component());
    const loadingText = getByText(/Loading/i);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(baseUrl);

    await waitForElementToBeRemoved(loadingText);
  });

  it("should fetch some data", async () => {
    const { findAllByRole } = render(component());
    const data = await findAllByRole("listitem");

    expect(data.length).toBe(2);
    expect(data[0]).toHaveTextContent(/Alex/i);
    expect(data[1]).toHaveTextContent(/Ivan/i);

    const deleteButtons = await findAllByRole("button", { name: "Delete" });
    expect(deleteButtons.length).toBe(2);
  });

  it("should be the text about no users existed", async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ json: () => [], ok: true }));
    const { findByText } = render(component());

    await findByText(/no users/i);
  });

  it("should be the error text", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject("error"));
    const { findByText } = render(component());
    await findByText(/Failed while getting data/i);
  });

  it("should first name input be focused", async () => {
    const { getByText, findByTestId } = render(component());
    const addButton = getByText(/add/i);
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);

    expect(await findByTestId("modal_firstname")).toHaveFocus();
  });

  it("should open modal on add click", async () => {
    const { getByText, queryByRole } = render(component());
    const addButton = getByText(/add/i);
    const loadingText = getByText(/Loading/i);
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);

    expect(queryByRole("dialog")).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingText);
  });

  it("should delete a user from the page", async () => {
    const { getAllByRole, getByText } = render(component());
    await waitForElementToBeRemoved(getByText(/Loading/i));

    const deleteButtons = getAllByRole("button", { name: "Delete" });
    userEvent.click(deleteButtons[0]);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[1]).toEqual([
      "http://localhost:3001/users/1",
      { method: "DELETE" },
    ]);

    await act(() => mockFetch);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch.mock.calls[2]).toEqual(["http://localhost:3001/users"]);
  });

  it("should add a new user in the page", async () => {
    const { getByText, findByTestId, findByText } = render(component());
    await waitForElementToBeRemoved(getByText(/Loading/i));

    const addButton = getByText(/add/i);
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);

    expect(await findByTestId("modal_firstname")).toBeInTheDocument();
    userEvent.type(await findByTestId("modal_firstname"), "Alex");
    expect(await findByTestId("modal_firstname")).toHaveValue("Alex");

    expect(await findByTestId("modal_lastname")).toBeInTheDocument();
    userEvent.type(await findByTestId("modal_lastname"), "Hodovas");
    expect(await findByTestId("modal_lastname")).toHaveValue("Hodovas");

    expect(await findByTestId("modal_age")).toBeInTheDocument();
    userEvent.type(await findByTestId("modal_age"), "25");
    expect(await findByTestId("modal_age")).toHaveValue(25);

    expect(await findByTestId("modal_gender")).toBeInTheDocument();
    expect(await findByTestId("modal_gender_male")).toBeInTheDocument();
    expect(await findByTestId("modal_gender_female")).toBeInTheDocument();
    userEvent.selectOptions(await findByTestId("modal_gender"), "Male");

    userEvent.click(await findByText(/OK/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[1]).toEqual([
      "http://localhost:3001/users",
      {
        body: '{"firstname":"Alex","lastname":"Hodovas","age":"25","gender":"Male"}',
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    ]);

    await act(() => mockFetch);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("should match snapshot", () => {
    const { asFragment } = render(component());
    expect(asFragment(component())).toMatchSnapshot();
  });
});
