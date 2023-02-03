import express from "express";
import ReactDOM from "react-dom/server";
import { Header } from "../shared/Header";
import { indexTemplate } from "./indexTemplate";

const NODE_ENV = process.env.NODE_ENV ?? "development";

const app = express();

app.use("/static", express.static("./dist/client"));

app.get("/", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(Header())));
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

// Reload browser page on code change
if (NODE_ENV === "development") {
  import("reload").then(module => {
    const reload = module.default;
    reload(app);
  })
}
