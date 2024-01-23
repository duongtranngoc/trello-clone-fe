import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { ConfirmProvider } from "material-ui-confirm";

import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarsProvider theme={theme} defaultMode="system">
    <ConfirmProvider
      defaultOptions={{
        dialogProps: { maxWidth: "xs" },
        buttonOrder: ["confirm", "cancel"],
        confirmationButtonProps: { color: "success" },
        cancellationButtonProps: { color: "inherit" },
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </ConfirmProvider>
  </CssVarsProvider>
);
