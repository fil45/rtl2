import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "redux/sagas";
import { reducer } from "./index";
// import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(
          sagaMiddleware
          // thunk
        )
      )
    : applyMiddleware(
        sagaMiddleware
        // thunk
      )
);

sagaMiddleware.run(rootSaga);

export default store;
