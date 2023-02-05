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
  res.json({Hello: 'hi'});
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
