import './polyfills.js';

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import eruda from 'eruda';
import App from "./App";
import './fonts/NeueMachina/NeueMachina-Regular.ttf';

const root = ReactDOM.createRoot(document.getElementById("root"));
eruda.init()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
