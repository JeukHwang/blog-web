import { createBrowserRouter } from "react-router-dom";
import Spend2Buy from "./Spend2Buy";

const router = createBrowserRouter([
  {
    path: "/spend2buy",
    element: <Spend2Buy />,
  },
  {
    path: "*",
    element: <p>Not Found</p>,
  },
]);

export default router;
