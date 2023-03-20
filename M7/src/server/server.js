import express from "express";
import ReactDOM from "react-dom/server";
import { indexTemplate } from "./indexTemplate";
import App from "../shared/App";
import * as path from "path";

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(<App />)));
});

app.get("/auth", (req, res) => {
  //  req.query.code;
  res.send(indexTemplate(ReactDOM.renderToString(<App />)));
});

app.get("/api", (req, res) => {
  res.json({ message: "Hi, from server api." });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

app.on("uncaughtException", (err) => {
  console.error("Caught exception: ", err);
});
