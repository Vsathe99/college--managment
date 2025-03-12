import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StudentDetailProvider } from "./context/StudentDetailContext.jsx";
import TeacherContext, { TeacherProvider } from "./context/TeacherContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <>
  <Provider store={store}>
    <BrowserRouter>
      <TeacherProvider>
        <StudentDetailProvider>
          <App />
        </StudentDetailProvider>
      </TeacherProvider>
    </BrowserRouter>
  </Provider>
  </>
);
