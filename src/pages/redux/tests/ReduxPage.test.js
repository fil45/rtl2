import { render, screen } from "@testing-library/react";
import ReduxPage from "../ReduxPage";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { reducer, defaultState } from "../../../redux";
import axios from "axios";
import { users } from "../../../testHelper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "redux/sagas";

const sagaMiddleware = createSagaMiddleware();

// was in video tutorial

// import thunk from "redux-thunk";
// const renderWithRedux = (
//   component,
//   {
//     initialState = defaultState,
//     store = createStore(reducer, initialState, applyMiddleware(thunk)),
//   }
// ) => {
//   return { ...render(<Provider store={store}>{component} </Provider>), store };
// };

const renderWithRedux = (
  component,
  {
    initialState = defaultState,
    store = createStore(
      reducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
            applyMiddleware(sagaMiddleware)
          )
        : applyMiddleware(sagaMiddleware)
    ),
  }
) => {
  return { ...render(<Provider store={store}>{component} </Provider>), store };
};

jest.mock("axios");

describe("ReduxPage --->", () => {
  it("should renders no users text", () => {
    renderWithRedux(<ReduxPage />, {});
    const text = screen.getByText(/no users/i);
    expect(text).toBeInTheDocument();
  });

  it("should renders user list after get users click", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: users }));
    renderWithRedux(<ReduxPage />, {});
    sagaMiddleware.run(rootSaga);

    const button = screen.getByRole("button", { name: /get users/i });
    userEvent.click(button);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("should renders no users text after reseting", async () => {
    renderWithRedux(<ReduxPage />, {
      initialState: {
        users,
        loading: false,
      },
    });
    sagaMiddleware.run(rootSaga);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    const button = screen.getByRole("button", { name: /reset/i });
    userEvent.click(button);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    const text = screen.getByText(/no users/i);
    expect(text).toBeInTheDocument();
  });
});
