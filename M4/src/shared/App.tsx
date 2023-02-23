import { hot } from "react-hot-loader/root";
import React from "react";

import "the-new-css-reset/css/reset.css";
import "./main.global.css";

function AppComponent() {
  return <div>content</div>;
}

export const App = hot(AppComponent);
