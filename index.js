/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import RoleAddForm from "./views/Role/RoleAddForm";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store'
import { Provider } from 'react-redux'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <I18nextProvider i18n={i18n}>
    <Router>
    <Provider store={store}>
      <App />
    </Provider>
    </Router>
  </I18nextProvider>
);


reportWebVitals();
