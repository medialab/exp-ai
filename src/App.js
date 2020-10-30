/* eslint import/no-webpack-loader-syntax: off */
import "./App.scss";

import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import Container from "./containers/GlobalContainer";

import configureStore from "./state/store";
import translate from "./helpers/translate";

const initialState = {};

const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <Helmet>
        <title>{translate("site_title")}</title>
      </Helmet>
      <Container />
    </Provider>
  );
}

export default App;
