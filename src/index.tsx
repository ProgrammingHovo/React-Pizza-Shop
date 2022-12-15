import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
//        HashRouter

import { store } from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
