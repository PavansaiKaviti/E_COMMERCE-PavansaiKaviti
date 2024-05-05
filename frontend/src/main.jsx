import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import Store from "./Store/Store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
const nodename = document.getElementById("root");
const Root = ReactDom.createRoot(nodename);
Root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={Store}>
        <PayPalScriptProvider deferLoading={true}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
