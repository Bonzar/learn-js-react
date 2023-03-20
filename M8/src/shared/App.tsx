import React from "react";

import "the-new-css-reset/css/reset.css";
import "./main.global.css";
import { Layout } from "./Layout";
import { Content } from "./Content";
import { Header } from "./Header";
import { CardsList } from "./CardsList";

const App = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <CardsList />
      </Content>
    </Layout>
  );
};

export default App;
