/* eslint import/no-webpack-loader-syntax: off */
import logo from "./logo.svg";
import "./App.scss";

import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import Container from "./components/Container";

import configureStore from "./state/store";
import translate from "./helpers/translate";

import intro from "!!raw-loader!./contents/global_intro.md";

const initialState = {};

const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <Helmet>
        <title>{translate("siteTitle")}</title>
      </Helmet>
      <Container />
    </Provider>
  );
}

export default App;
