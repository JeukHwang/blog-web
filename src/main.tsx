import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <div>
        <Toaster position="bottom-center" />
      </div>
      <RouterProvider router={router} />
    </>
  </React.StrictMode>,
);
