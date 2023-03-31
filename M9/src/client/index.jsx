import { hydrateRoot } from "react-dom/client";
import App from "../shared/App";

window.addEventListener("load", () => {
  hydrateRoot(document.getElementById("react-root"), <App />);
});
