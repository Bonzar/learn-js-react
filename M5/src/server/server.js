import React from "react";
import ReactDOM from "react-dom/server";
import express from "express";
import { indexTemplate } from "./indexTemplate";
import { App } from "../shared/App";

const app = express();

app.use("/static", express.static("./dist/client"));

app.get("/", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(<App/>)));
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

app.on('uncaughtException',  (err) => {
  console.error('Caught exception: ', err);
});
