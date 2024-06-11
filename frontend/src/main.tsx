import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import Store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/index.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme/second.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
