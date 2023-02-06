import express from "express";
import ReactDOM from "react-dom/server";
import { indexTemplate } from "./indexTemplate";
import { Body } from "../shared/Body";

const app = express();

app.use("/static", express.static("./dist/client"));

app.get("/", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(<Body />)));
});

app.get("/api", (req, res) => {
  res.json({ message: "Hi, from server api." });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

app.on('uncaughtException',  (err) => {
  console.error('Caught exception: ', err);
});
