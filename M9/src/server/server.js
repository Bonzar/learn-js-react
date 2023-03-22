import express from "express";
import ReactDOM from "react-dom/server";
import { indexTemplate } from "./indexTemplate";
import App from "../shared/App";
import * as path from "path";
import axios from "axios";

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(<App />)));
});

app.get("/auth", (req, res) => {
  if (req.query.error) {
    console.error(req.query.error);
    res.redirect("/");
    return;
  }

  if (!req.query.code) {
    console.error("No auth code was provided.");
    res.redirect("/");
    return;
  }

  axios
    .post(
      "https://www.reddit.com/api/v1/access_token",
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: "3adaOCwkYg7ylJZbwYZEsQ_fuiH7VA",
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )
    .then(({ data }) => {
      res.query = undefined;
      const token = data["access_token"];
      res.redirect(`/?token=${token}`);
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/");
    });
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
