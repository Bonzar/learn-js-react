import React from "react";

import "the-new-css-reset/css/reset.css";
import "./main.global.css";
import { Layout } from "./Layout";
import { Content } from "./Content";
import { Header } from "./Header";

const App = () => {
  return (
    <Layout>
      <Header />
      <Content />
    </Layout>
  );
};

export default App;
