import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "../ScrollToTop.js";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <HelmetProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);