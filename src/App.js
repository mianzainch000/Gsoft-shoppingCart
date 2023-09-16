import "./App.css";
import store from "./Redux/Store/store";
import { Routers } from "./Router";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Routers />
      </Provider>
    </div>
  );
}

export default App;
