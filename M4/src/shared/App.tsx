import { hot } from "react-hot-loader/root";
import React from "react";

import "./main.global.css";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Content } from "./Content";
import { CardsList } from "./CardsList";

function AppComponent() {
  return (
    <Layout>
      <Header />
      <Content>
        <CardsList />
      </Content>
    </Layout>
  );
}

export const App = hot(AppComponent);
