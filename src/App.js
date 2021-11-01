import "App.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import Router from "Router";
import SelectedUsersContextProvider from "SelectedUsersContextProvider";

function App() {
  return (
    <SelectedUsersContextProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </SelectedUsersContextProvider>
  );
}

export default App;
