/* eslint import/no-webpack-loader-syntax: off */
import logo from "./logo.svg";
import "./App.scss";

import { Provider } from "react-redux";

import configureStore from "./state/store";

import data from "./contents/messages.fr.yml";
import intro from "!!raw-loader!./contents/global_intro.md";

const initialState = {};

const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  );
}

export default App;
