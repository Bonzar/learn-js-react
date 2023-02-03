import { hydrateRoot } from "react-dom/client";
import { Header } from "../shared/Header";

hydrateRoot(document.getElementById("react-root"), <Header />);
