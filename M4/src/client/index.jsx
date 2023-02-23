import { hydrateRoot } from "react-dom/client";
import App from "../shared/App";

hydrateRoot(document.getElementById("react-root"), <App />);
