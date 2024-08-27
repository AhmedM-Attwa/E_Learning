import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import SignContext from "./pages/Sign/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <SignContext>
    <Provider store={store}>
      <App />
    </Provider>
  </SignContext>
);
